import "server-only";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

import servicesJson from "@/data/services.json";
import portfolioJson from "@/data/portfolio.json";
import projectsJson from "@/data/projects.json";
import testimonialsJson from "@/data/testimonials.json";
import statsJson from "@/data/stats.json";
import btsJson from "@/data/bts.json";
import clientsJson from "@/data/clients.json";
import instagramJson from "@/data/instagram.json";
import siteJson from "@/data/site.json";

const DB_PATH = path.join(process.cwd(), "data", "app.db");

// Cache the connection across hot reloads in dev.
const g = globalThis as unknown as { __fpsDb?: Database.Database };

export function getDb(): Database.Database {
  if (g.__fpsDb) return g.__fpsDb;
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("foreign_keys = ON");
  migrate(db);
  seedIfEmpty(db);
  g.__fpsDb = db;
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS site (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT, tagline TEXT, description TEXT,
      address TEXT, phone TEXT, email TEXT,
      facebook TEXT, instagram TEXT, youtube TEXT
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY,
      slug TEXT, title TEXT, tagline TEXT, icon TEXT,
      description TEXT, features TEXT, sort INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY,
      title TEXT, category TEXT, image TEXT, video TEXT,
      sort INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      number TEXT, slug TEXT UNIQUE, title TEXT, client TEXT,
      category TEXT, year TEXT, description TEXT,
      deliverables TEXT, video TEXT, image TEXT, sort INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS project_clips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      title TEXT, src TEXT, sort INTEGER DEFAULT 0,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY,
      name TEXT, role TEXT, quote TEXT, avatar TEXT, sort INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY,
      value INTEGER, suffix TEXT, label TEXT, sort INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS bts (
      id INTEGER PRIMARY KEY,
      title TEXT, label TEXT, description TEXT, image TEXT, video TEXT,
      sort INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY,
      name TEXT, sort INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS instagram (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT, image TEXT, alt TEXT, sort INTEGER DEFAULT 0
    );
  `);
}

function isEmpty(db: Database.Database, table: string): boolean {
  const row = db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as {
    n: number;
  };
  return row.n === 0;
}

function seedIfEmpty(db: Database.Database) {
  const tx = db.transaction(() => {
    if (isEmpty(db, "site")) {
      const s = siteJson as any;
      db.prepare(
        `INSERT INTO site (id, name, tagline, description, address, phone, email, facebook, instagram, youtube)
         VALUES (1, @name, @tagline, @description, @address, @phone, @email, @facebook, @instagram, @youtube)`
      ).run({
        name: s.name,
        tagline: s.tagline,
        description: s.description,
        address: s.contact?.address ?? "",
        phone: s.contact?.phone ?? "",
        email: s.contact?.email ?? "",
        facebook: s.social?.facebook ?? "",
        instagram: s.social?.instagram ?? "",
        youtube: s.social?.youtube ?? ""
      });
    }

    if (isEmpty(db, "services")) {
      const ins = db.prepare(
        `INSERT INTO services (id, slug, title, tagline, icon, description, features, sort)
         VALUES (@id, @slug, @title, @tagline, @icon, @description, @features, @sort)`
      );
      (servicesJson as any[]).forEach((x, i) =>
        ins.run({
          id: x.id,
          slug: x.slug,
          title: x.title,
          tagline: x.tagline,
          icon: x.icon,
          description: x.description,
          features: JSON.stringify(x.features ?? []),
          sort: i
        })
      );
    }

    if (isEmpty(db, "portfolio")) {
      const ins = db.prepare(
        `INSERT INTO portfolio (id, title, category, image, video, sort)
         VALUES (@id, @title, @category, @image, @video, @sort)`
      );
      (portfolioJson as any[]).forEach((x, i) =>
        ins.run({
          id: x.id,
          title: x.title,
          category: x.category,
          image: x.image,
          video: x.video ?? null,
          sort: i
        })
      );
    }

    if (isEmpty(db, "projects")) {
      const insP = db.prepare(
        `INSERT INTO projects (id, number, slug, title, client, category, year, description, deliverables, video, image, sort)
         VALUES (@id, @number, @slug, @title, @client, @category, @year, @description, @deliverables, @video, @image, @sort)`
      );
      const insC = db.prepare(
        `INSERT INTO project_clips (project_id, title, src, sort) VALUES (@project_id, @title, @src, @sort)`
      );
      (projectsJson as any[]).forEach((p, i) => {
        insP.run({
          id: p.id,
          number: p.number,
          slug: p.slug,
          title: p.title,
          client: p.client,
          category: p.category,
          year: p.year,
          description: p.description,
          deliverables: JSON.stringify(p.deliverables ?? []),
          video: p.video ?? null,
          image: p.image,
          sort: i
        });
        (p.clips ?? []).forEach((c: any, ci: number) =>
          insC.run({ project_id: p.id, title: c.title, src: c.src, sort: ci })
        );
      });
    }

    if (isEmpty(db, "testimonials")) {
      const ins = db.prepare(
        `INSERT INTO testimonials (id, name, role, quote, avatar, sort)
         VALUES (@id, @name, @role, @quote, @avatar, @sort)`
      );
      (testimonialsJson as any[]).forEach((x, i) =>
        ins.run({
          id: x.id,
          name: x.name,
          role: x.role,
          quote: x.quote,
          avatar: x.avatar,
          sort: i
        })
      );
    }

    if (isEmpty(db, "stats")) {
      const ins = db.prepare(
        `INSERT INTO stats (id, value, suffix, label, sort) VALUES (@id, @value, @suffix, @label, @sort)`
      );
      (statsJson as any[]).forEach((x, i) =>
        ins.run({
          id: x.id,
          value: x.value,
          suffix: x.suffix,
          label: x.label,
          sort: i
        })
      );
    }

    if (isEmpty(db, "bts")) {
      const ins = db.prepare(
        `INSERT INTO bts (id, title, label, description, image, video, sort)
         VALUES (@id, @title, @label, @description, @image, @video, @sort)`
      );
      (btsJson as any[]).forEach((x, i) =>
        ins.run({
          id: x.id,
          title: x.title,
          label: x.label ?? "",
          description: x.description ?? "",
          image: x.image,
          video: x.video ?? null,
          sort: i
        })
      );
    }

    if (isEmpty(db, "clients")) {
      const ins = db.prepare(
        `INSERT INTO clients (id, name, sort) VALUES (@id, @name, @sort)`
      );
      (clientsJson as any[]).forEach((x, i) =>
        ins.run({ id: x.id, name: x.name, sort: i })
      );
    }

    if (isEmpty(db, "instagram")) {
      const ins = db.prepare(
        `INSERT INTO instagram (url, image, alt, sort) VALUES (@url, @image, @alt, @sort)`
      );
      (instagramJson as any[]).forEach((x, i) =>
        ins.run({
          url: x.url,
          image: x.image,
          alt: x.alt ?? "",
          sort: i
        })
      );
    }
  });
  tx();
}
