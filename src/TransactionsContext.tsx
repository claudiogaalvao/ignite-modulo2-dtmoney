import { useEffect, useState, createContext, ReactNode } from "react";
import { api } from "./services/api";

interface ITransaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext<ITransaction[]>([]);


export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransaction] = useState<ITransaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransaction(response.data.transactions));
    }, []);

    return (
        <TransactionsContext.Provider value={transactions}>
            {children}
        </TransactionsContext.Provider>
    );
}

