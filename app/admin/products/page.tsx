import { requireAdmin } from "@/lib/auth-guard";

const AdminProducts = async () => {
    await requireAdmin()
    return (<>Admin Products</>);
}

export default AdminProducts;