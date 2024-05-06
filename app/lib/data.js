import {createClient} from "@/supabase/client";

const supabase = createClient()

export const fetchUsers = async (search = "", page = 1) => {
    const ITEMS_PER_PAGE = 5
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

export const fetchUserById = async (id) => {
    try {
        const {data: user, error} = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
        if (error) {
            console.error('Error fetching user:', error);
            return null;
        }
        return user[0]
    } catch (error) {
        console.error('Unexpected error fetching user by id:', error);
    }
}

export const fetchProducts = async (page = 1, search = "") => {
    const ITEMS_PER_PAGE = 5
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = page * ITEMS_PER_PAGE - 1
    try {
        const {data: products, error, count} = await supabase.from("products")
            .select("*", {count: "exact"}).ilike('title', `%${search}%`)
            .range(startIndex, endIndex)
        if (error) {
            console.error("Error fetching products", error)
            return null
        }
        return {products, count}
    } catch (error) {
        console.error("Unexpected error fetching products:", error)
    }
}

export const fetchProductById = async (id) => {
    try {
        const {data: product, error} = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
        if (error) {
            console.error('Error fetching product:', error);
            return null;
        }
        return product[0]
    } catch (error) {
        console.error('Unexpected error fetching product by id:', error);
    }
}