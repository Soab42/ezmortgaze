import PostEditor from "@/components/admin/PostEditor"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return <PostEditor postId={resolvedParams.id} />
}
