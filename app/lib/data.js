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
            .select("*", {count: "exact"})
            .ilike('title', `%${search}%`)
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

export const fetchTransactions = async (page = 1, search = "") => {
    const ITEMS_PER_PAGE = 5
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const endIndex = page * ITEMS_PER_PAGE - 1
    try {
        let {data: transactions, error} = await supabase
            .rpc("transaction_details")
            .select("*")
            .ilike('user_name', `%${search}%`)
            .range(startIndex, endIndex)
        if (error) {
            console.error("Error fetching transactions:", error);
            return;
        }
        const count = transactions[0]?.transaction_count || 0
        return {transactions, count}
    } catch (error) {
        console.error("Unexpected error fetching transactions:", error)
    }
}

export const fetchSalesByCategory = async () => {
    try {
        let {data, error} = await supabase
            .rpc("transaction_details")
        const salesByCategory = data.filter(item => item.status === "completed").reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + item.total_amount
            return acc
        }, {})
        return salesByCategory
    } catch (error) {
        console.error("Unexpected error fetching transactions by category:", error)
    }
}

export async function fetchLastTransactions() {
    let {data: transactions, error} = await supabase
        .rpc("transaction_details")
        .select("*")
        .order("transaction_date", {ascending: false})
        .limit(10);

    if (error) {
        console.error("Error fetching transactions:", error);
        return;
    }

    return transactions;
}

export async function fetchCardData() {
    try {
        // Define the queries
        const fetchUsers = supabase
            .from("users")
            .select('*', {count: 'exact', head: true})
            .eq("admin", false)
            .then(({data, count, error}) => {
                if (error) throw error;
                return count;
            }); // Fetching all users who are not admin

        const fetchStockValue = supabase
            .from("products")
            .select("price, stock")
            .then(({data, error}) => {
                if (error) throw error;
                // Calculate total value from price and stock
                return data.reduce((acc, product) => acc + (product.price * product.stock), 0);
            });

        const fetchSales = supabase
            .rpc("transaction_details")
            .select("*")
            .then(({data: sales, error}) => {
                if (error) throw error
                return sales
            })

        const [users, stockValue, sales] = await Promise.all([fetchUsers, fetchStockValue, fetchSales]);
        // first fetch sales from procedure and return it
        const totalSales = sales.filter(transaction => transaction.status === "completed").reduce((total, transaction) => total + transaction.total_amount, 0)
        return {
            users,
            stockValue,
            totalSales
        };

    } catch (error) {
        console.error("Error fetching card data:", error);
    }
}

export async function signOut() {
    const {error} = await supabase.auth.signOut();
    if (error) {
        console.error("Error during sign out:", error);
    }
}
