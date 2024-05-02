import {createClient} from "@/supabase/server";

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
        return {users, count}
    } catch (error) {
        console.log(error)
    }
}