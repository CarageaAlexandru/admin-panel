import {createClient} from "@/supabase/client";

const supabase = createClient()
export const fetchUsers = async (search = "", page = 1) => {
    const ITEMS_PER_PAGE = 3
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = page * ITEMS_PER_PAGE - 1
    try {
        const {data: users, error, count} = await supabase
            .from('users')
            .select("*", {count: "exact"})
            .ilike('name', `%${search}%`)
            .range(startIndex, endIndex)
        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }
        return {users, count}
    } catch (error) {
        console.error('Unexpected error fetching users:', error);
    }
}
