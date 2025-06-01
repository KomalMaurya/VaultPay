import axiosInstance from './index';

//verify receiver account

export const VerifyAccount=async(payload)=>{
    try{
        const {data} =await axiosInstance.post("api/transactions/verify-account",payload,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            },
        });
        return data;
    }catch(error){
        return error.response.data;
    }
};

//transfer funds

export const TransferFunds=async(payload)=>{
    try{
        const{data} =await axiosInstance.post("/api/transactions/transfer-funds",
            payload
        );
        return data;
    }
    catch(error){
        return error.respone.data;
    }
};


//get all transactions for a user
export const GetTransactionsOfUser=async()=>{
    try{
        const {data} =await axiosInstance.post("/api/transactions//get-all-transactions-by-user");
        return data;
    }catch(error){
        return error.respone.data;
    }
}