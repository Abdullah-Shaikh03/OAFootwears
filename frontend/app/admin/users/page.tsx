import { fetchApi } from "@/utils/api"
import { UserList } from "@/components/admin/UserList"

export default async function UsersPage() {
  const users = await fetchApi('/admin/users');

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#1C1C1C]">Users</h1>
      <UserList initialUsers={users} />
    </div>
  )
}

