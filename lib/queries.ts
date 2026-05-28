import "server-only";
import { getDb } from "@/lib/db";

export type Clip = { title: string; src: string };

export type Project = {
  id: number;
  number: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  deliverables: string[];
  video: string | null;
  image: string;
  clips: Clip[];
};

export type ProjectInput = Omit<Project, "id">;

function rowToProject(db: ReturnType<typeof getDb>, r: any): Project {
  const clips = db
    .prepare(
      "SELECT title, src FROM project_clips WHERE project_id = ? ORDER BY sort, id"
    )
    .all(r.id) as Clip[];
  return {
    id: r.id,
    number: r.number,
    slug: r.slug,
    title: r.title,
    client: r.client,
    category: r.category,
    year: r.year,
    description: r.description,
    deliverables: JSON.parse(r.deliverables || "[]"),
    video: r.video,
    image: r.image,
    clips
  };
}

export function getProjects(): Project[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM projects ORDER BY sort, id")
    .all() as any[];
  return rows.map((r) => rowToProject(db, r));
}

export function getProjectBySlug(slug: string): Project | null {
  const db = getDb();
  const r = db.prepare("SELECT * FROM projects WHERE slug = ?").get(slug) as any;
  return r ? rowToProject(db, r) : null;
}

export function getProjectById(id: number): Project | null {
  const db = getDb();
  const r = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as any;
  return r ? rowToProject(db, r) : null;
}

function writeClips(
  db: ReturnType<typeof getDb>,
  projectId: number,
  clips: Clip[]
) {
  db.prepare("DELETE FROM project_clips WHERE project_id = ?").run(projectId);
  const ins = db.prepare(
    "INSERT INTO project_clips (project_id, title, src, sort) VALUES (?, ?, ?, ?)"
  );
  clips.forEach((c, i) => ins.run(projectId, c.title, c.src, i));
}

export function createProject(data: ProjectInput): number {
  const db = getDb();
  const maxSort =
    (db.prepare("SELECT MAX(sort) AS m FROM projects").get() as any)?.m ?? 0;
  const tx = db.transaction(() => {
    const info = db
      .prepare(
        `INSERT INTO projects (number, slug, title, client, category, year, description, deliverables, video, image, sort)
         VALUES (@number, @slug, @title, @client, @category, @year, @description, @deliverables, @video, @image, @sort)`
      )
      .run({
        number: data.number,
        slug: data.slug,
        title: data.title,
        client: data.client,
        category: data.category,
        year: data.year,
        description: data.description,
        deliverables: JSON.stringify(data.deliverables ?? []),
        video: data.video || null,
        image: data.image,
        sort: maxSort + 1
      });
    const id = Number(info.lastInsertRowid);
    writeClips(db, id, data.clips ?? []);
    return id;
  });
  return tx();
}

export function updateProject(id: number, data: ProjectInput): void {
  const db = getDb();
  const tx = db.transaction(() => {
    db.prepare(
      `UPDATE projects SET number=@number, slug=@slug, title=@title, client=@client,
         category=@category, year=@year, description=@description,
         deliverables=@deliverables, video=@video, image=@image WHERE id=@id`
    ).run({
      id,
      number: data.number,
      slug: data.slug,
      title: data.title,
      client: data.client,
      category: data.category,
      year: data.year,
      description: data.description,
      deliverables: JSON.stringify(data.deliverables ?? []),
      video: data.video || null,
      image: data.image
    });
    writeClips(db, id, data.clips ?? []);
  });
  tx();
}

export function deleteProject(id: number): void {
  const db = getDb();
  db.prepare("DELETE FROM projects WHERE id = ?").run(id);
}

export function countAll() {
  const db = getDb();
  const c = (t: string) =>
    (db.prepare(`SELECT COUNT(*) AS n FROM ${t}`).get() as any).n as number;
  return {
    projects: c("projects"),
    services: c("services"),
    portfolio: c("portfolio"),
    clients: c("clients"),
    stats: c("stats"),
    bts: c("bts")
  };
}

/* ===================== Services ===================== */
export type Service = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  description: string;
  features: string[];
};
export type ServiceInput = Omit<Service, "id">;

export function getServices(): Service[] {
  return (
    getDb().prepare("SELECT * FROM services ORDER BY sort, id").all() as any[]
  ).map((r) => ({ ...r, features: JSON.parse(r.features || "[]") }));
}
export function getServiceById(id: number): Service | null {
  const r = getDb().prepare("SELECT * FROM services WHERE id = ?").get(id) as any;
  return r ? { ...r, features: JSON.parse(r.features || "[]") } : null;
}
export function saveService(id: number, d: ServiceInput) {
  const db = getDb();
  const features = JSON.stringify(d.features ?? []);
  if (id > 0)
    db.prepare(
      "UPDATE services SET slug=@slug,title=@title,tagline=@tagline,icon=@icon,description=@description,features=@features WHERE id=@id"
    ).run({ id, ...d, features });
  else {
    const m = (db.prepare("SELECT MAX(sort) m FROM services").get() as any)?.m ?? 0;
    db.prepare(
      "INSERT INTO services (slug,title,tagline,icon,description,features,sort) VALUES (@slug,@title,@tagline,@icon,@description,@features,@sort)"
    ).run({ ...d, features, sort: m + 1 });
  }
}
export function deleteService(id: number) {
  getDb().prepare("DELETE FROM services WHERE id=?").run(id);
}

/* ===================== Portfolio ===================== */
export type PortfolioItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  video: string | null;
};
export type PortfolioInput = Omit<PortfolioItem, "id">;

export function getPortfolio(): PortfolioItem[] {
  return getDb()
    .prepare("SELECT * FROM portfolio ORDER BY sort, id")
    .all() as PortfolioItem[];
}
export function savePortfolio(id: number, d: PortfolioInput) {
  const db = getDb();
  const v = d.video || null;
  if (id > 0)
    db.prepare(
      "UPDATE portfolio SET title=@title,category=@category,image=@image,video=@video WHERE id=@id"
    ).run({ id, ...d, video: v });
  else {
    const m = (db.prepare("SELECT MAX(sort) m FROM portfolio").get() as any)?.m ?? 0;
    db.prepare(
      "INSERT INTO portfolio (title,category,image,video,sort) VALUES (@title,@category,@image,@video,@sort)"
    ).run({ ...d, video: v, sort: m + 1 });
  }
}
export function deletePortfolio(id: number) {
  getDb().prepare("DELETE FROM portfolio WHERE id=?").run(id);
}

/* ===================== Clients ===================== */
export type Client = { id: number; name: string };

export function getClients(): Client[] {
  return getDb()
    .prepare("SELECT * FROM clients ORDER BY sort, id")
    .all() as Client[];
}
export function saveClient(id: number, name: string) {
  const db = getDb();
  if (id > 0) db.prepare("UPDATE clients SET name=? WHERE id=?").run(name, id);
  else {
    const m = (db.prepare("SELECT MAX(sort) m FROM clients").get() as any)?.m ?? 0;
    db.prepare("INSERT INTO clients (name,sort) VALUES (?,?)").run(name, m + 1);
  }
}
export function deleteClient(id: number) {
  getDb().prepare("DELETE FROM clients WHERE id=?").run(id);
}

/* ===================== Stats ===================== */
export type Stat = { id: number; value: number; suffix: string; label: string };
export type StatInput = Omit<Stat, "id">;

export function getStats(): Stat[] {
  return getDb().prepare("SELECT * FROM stats ORDER BY sort, id").all() as Stat[];
}
export function saveStat(id: number, d: StatInput) {
  const db = getDb();
  if (id > 0)
    db.prepare(
      "UPDATE stats SET value=@value,suffix=@suffix,label=@label WHERE id=@id"
    ).run({ id, ...d });
  else {
    const m = (db.prepare("SELECT MAX(sort) m FROM stats").get() as any)?.m ?? 0;
    db.prepare(
      "INSERT INTO stats (value,suffix,label,sort) VALUES (@value,@suffix,@label,@sort)"
    ).run({ ...d, sort: m + 1 });
  }
}
export function deleteStat(id: number) {
  getDb().prepare("DELETE FROM stats WHERE id=?").run(id);
}

/* ===================== BTS (Originals) ===================== */
export type Bts = {
  id: number;
  title: string;
  label: string;
  description: string;
  image: string;
  video: string | null;
};
export type BtsInput = Omit<Bts, "id">;

export function getBts(): Bts[] {
  return getDb().prepare("SELECT * FROM bts ORDER BY sort, id").all() as Bts[];
}
export function saveBts(id: number, d: BtsInput) {
  const db = getDb();
  const v = d.video || null;
  if (id > 0)
    db.prepare(
      "UPDATE bts SET title=@title,label=@label,description=@description,image=@image,video=@video WHERE id=@id"
    ).run({ id, ...d, video: v });
  else {
    const m = (db.prepare("SELECT MAX(sort) m FROM bts").get() as any)?.m ?? 0;
    db.prepare(
      "INSERT INTO bts (title,label,description,image,video,sort) VALUES (@title,@label,@description,@image,@video,@sort)"
    ).run({ ...d, video: v, sort: m + 1 });
  }
}
export function deleteBts(id: number) {
  getDb().prepare("DELETE FROM bts WHERE id=?").run(id);
}

/* ===================== Instagram ===================== */
export type Instagram = {
  id: number;
  url: string;
  image: string;
  alt: string;
};
export type InstagramInput = Omit<Instagram, "id">;

export function getInstagram(): Instagram[] {
  return getDb()
    .prepare("SELECT * FROM instagram ORDER BY sort, id")
    .all() as Instagram[];
}
export function saveInstagram(id: number, d: InstagramInput) {
  const db = getDb();
  if (id > 0)
    db.prepare(
      "UPDATE instagram SET url=@url, image=@image, alt=@alt WHERE id=@id"
    ).run({ id, ...d });
  else {
    const m =
      (db.prepare("SELECT MAX(sort) m FROM instagram").get() as any)?.m ?? 0;
    db.prepare(
      "INSERT INTO instagram (url, image, alt, sort) VALUES (@url, @image, @alt, @sort)"
    ).run({ ...d, sort: m + 1 });
  }
}
export function deleteInstagram(id: number) {
  getDb().prepare("DELETE FROM instagram WHERE id=?").run(id);
}

/* ===================== Messages (Contact form) ===================== */
export type Message = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  received_at: string;
};

export function getMessages(): Message[] {
  return getDb()
    .prepare("SELECT * FROM messages ORDER BY id DESC")
    .all() as Message[];
}

export function addMessage(d: Omit<Message, "id" | "received_at">) {
  getDb()
    .prepare(
      "INSERT INTO messages (name, email, phone, service, message, received_at) VALUES (@name, @email, @phone, @service, @message, @received_at)"
    )
    .run({ ...d, received_at: new Date().toISOString() });
}

export function deleteMessage(id: number) {
  getDb().prepare("DELETE FROM messages WHERE id=?").run(id);
}

/* ===================== Site ===================== */
export type Site = {
  name: string;
  tagline: string;
  description: string;
  contact: { address: string; phone: string; email: string };
  social: { facebook: string; instagram: string; youtube: string };
};

export function getSite(): Site {
  const r = getDb().prepare("SELECT * FROM site WHERE id = 1").get() as any;
  return {
    name: r?.name ?? "FPS",
    tagline: r?.tagline ?? "",
    description: r?.description ?? "",
    contact: {
      address: r?.address ?? "",
      phone: r?.phone ?? "",
      email: r?.email ?? ""
    },
    social: {
      facebook: r?.facebook ?? "",
      instagram: r?.instagram ?? "",
      youtube: r?.youtube ?? ""
    }
  };
}
