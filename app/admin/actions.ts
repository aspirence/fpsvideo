"use server";

import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  ADMIN_TOKEN
} from "@/lib/admin-config";
import {
  createProject,
  updateProject,
  deleteProject,
  saveService,
  deleteService,
  savePortfolio,
  deletePortfolio,
  saveClient,
  deleteClient,
  saveStat,
  deleteStat,
  saveBts,
  deleteBts,
  type ProjectInput
} from "@/lib/queries";

function assertAuthed() {
  if (cookies().get(ADMIN_COOKIE)?.value !== ADMIN_TOKEN) {
    throw new Error("Not authorized");
  }
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    redirect("/admin/login?error=1");
  }
  cookies().set(ADMIN_COOKIE, ADMIN_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  redirect("/admin");
}

export async function logoutAction() {
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function formToProject(formData: FormData): ProjectInput {
  const clips = parseLines(String(formData.get("clips") ?? "")).map((line) => {
    const [title, ...rest] = line.split("|");
    return { title: (title ?? "").trim(), src: rest.join("|").trim() };
  });
  return {
    number: String(formData.get("number") ?? ""),
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? ""),
    client: String(formData.get("client") ?? ""),
    category: String(formData.get("category") ?? ""),
    year: String(formData.get("year") ?? ""),
    description: String(formData.get("description") ?? ""),
    deliverables: parseLines(String(formData.get("deliverables") ?? "")),
    video: String(formData.get("video") ?? "") || null,
    image: String(formData.get("image") ?? ""),
    clips
  };
}

export async function saveProjectAction(formData: FormData) {
  assertAuthed();
  const id = Number(formData.get("id") ?? 0);
  const data = formToProject(formData);
  if (id > 0) updateProject(id, data);
  else createProject(data);

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  assertAuthed();
  const id = Number(formData.get("id") ?? 0);
  if (id > 0) deleteProject(id);
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function uploadMediaAction(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  assertAuthed();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "No file selected" };

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name).toLowerCase() || "";
  const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, safe), bytes);
  revalidatePath("/admin/upload");
  return { url: `/uploads/${safe}` };
}

export async function deleteUploadAction(formData: FormData) {
  assertAuthed();
  // basename strips any path parts so only files inside /uploads can be removed
  const name = path.basename(String(formData.get("name") ?? "").trim());
  if (!name) return;
  const dir = path.join(process.cwd(), "public", "uploads");
  const file = path.join(dir, name);
  if (path.dirname(file) === dir && fs.existsSync(file)) fs.rmSync(file);
  revalidatePath("/admin/upload");
}

function refresh(adminPath: string) {
  revalidatePath("/");
  revalidatePath(adminPath);
}

/* ---------- Services ---------- */
export async function saveServiceAction(formData: FormData) {
  assertAuthed();
  const id = Number(formData.get("id") ?? 0);
  saveService(id, {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    icon: String(formData.get("icon") ?? "Video"),
    description: String(formData.get("description") ?? ""),
    features: parseLines(String(formData.get("features") ?? ""))
  });
  refresh("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}
export async function deleteServiceAction(formData: FormData) {
  assertAuthed();
  deleteService(Number(formData.get("id") ?? 0));
  refresh("/admin/services");
  revalidatePath("/services");
}

/* ---------- Portfolio ---------- */
export async function savePortfolioAction(formData: FormData) {
  assertAuthed();
  const id = Number(formData.get("id") ?? 0);
  savePortfolio(id, {
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? ""),
    image: String(formData.get("image") ?? ""),
    video: String(formData.get("video") ?? "") || null
  });
  refresh("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}
export async function deletePortfolioAction(formData: FormData) {
  assertAuthed();
  deletePortfolio(Number(formData.get("id") ?? 0));
  refresh("/admin/portfolio");
  revalidatePath("/portfolio");
}

/* ---------- Clients ---------- */
export async function saveClientAction(formData: FormData) {
  assertAuthed();
  saveClient(Number(formData.get("id") ?? 0), String(formData.get("name") ?? ""));
  refresh("/admin/clients");
  redirect("/admin/clients");
}
export async function deleteClientAction(formData: FormData) {
  assertAuthed();
  deleteClient(Number(formData.get("id") ?? 0));
  refresh("/admin/clients");
}

/* ---------- Stats ---------- */
export async function saveStatAction(formData: FormData) {
  assertAuthed();
  saveStat(Number(formData.get("id") ?? 0), {
    value: Number(formData.get("value") ?? 0),
    suffix: String(formData.get("suffix") ?? ""),
    label: String(formData.get("label") ?? "")
  });
  refresh("/admin/stats");
  redirect("/admin/stats");
}
export async function deleteStatAction(formData: FormData) {
  assertAuthed();
  deleteStat(Number(formData.get("id") ?? 0));
  refresh("/admin/stats");
}

/* ---------- BTS / Originals ---------- */
export async function saveBtsAction(formData: FormData) {
  assertAuthed();
  saveBts(Number(formData.get("id") ?? 0), {
    title: String(formData.get("title") ?? ""),
    label: String(formData.get("label") ?? ""),
    description: String(formData.get("description") ?? ""),
    image: String(formData.get("image") ?? ""),
    video: String(formData.get("video") ?? "") || null
  });
  refresh("/admin/originals");
  redirect("/admin/originals");
}
export async function deleteBtsAction(formData: FormData) {
  assertAuthed();
  deleteBts(Number(formData.get("id") ?? 0));
  refresh("/admin/originals");
}
