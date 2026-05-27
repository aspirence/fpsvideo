import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/queries";

export default function EditProjectPage({
  params
}: {
  params: { id: string };
}) {
  const project = getProjectById(Number(params.id));
  if (!project) notFound();
  return (
    <AdminShell title={`Edit: ${project.title}`}>
      <ProjectForm project={project} />
    </AdminShell>
  );
}
