import React from 'react'
import {message, Modal} from 'antd';
import {Form} from 'antd';
import {useDispatch, useSelector } from 'react-redux';
import {ShowLoading,HideLoading} from "../../redux/loadersSlice";
import { TransferFunds, VerifyAccount } from '../../apicalls/transactions';
import { response } from 'express';

function TransferFundsModal({showTransferFundsModal,
    setShowTransferFundsModal,reloadData}) {
        const {user}=useSelector(state=>state.users);
    const [isVerified,setIsVerified]=React.useState("");
    const [form]=Form.useForm();
    const dispatch=useDispatch();
    const onFinish=async(values)=>{
        try {
            dispatch(ShowLoading());
            const payload={
                ...values,
                sender:user._id,
                reference:values.receiver,
                status:"success"
            };
            const response=await TransferFunds(payload);
            if(response.success){
                setShowTransferFundsModal(false);
                message.success(response.message);
            }
            else{
                message.error(response.message);
            }
            dispatch(HideLoading());
        } catch (error) {
            message.error(response.message);
            dispatch(HideLoading());
        }
    }
    const verifyAccount=async()=>{
        try {
            dispatch(ShowLoading());
            const response =await VerifyAccount({
                receiver:form.getFieldValue("receiver")
            });
            dispatch(HideLoading());
            if(response.success){
                setIsVerified("true");
            }else{
                setIsVerified("false");
            }
        } catch (error) {
            dispatch(HideLoading());
            setIsVerified("false");
        }
    };
  return (
    <div>
        <Modal title="Transfer Funds"
        open={showTransferFundsModal}
        onCancel={()=>setShowTransferFundsModal(false)}
        footer={null}
        >
            <Form layout='vertical' form={form} onFinish={onFinish}>
               <div className="flex gap-2 items-center">
                 <Form.Item 
                label="Account Number" name="receiver" className='w-100'
                >
                    <input type='text'/>
                </Form.Item>
                <button className="primary-contained-btn mt-1" type='button' 
                onClick={verifyAccount}
                >
                    VERIFY
                </button>
               </div>
               {isVerified==='true' && <div>
                <div className="success-bg">
                    <h1 className="text-sm">
                    Account Verified Successfully
                </h1>
                </div>
                </div>}
                {isVerified==='false' && <div>
                <div className="error-bg">
                    <h1 className="text-sm">
                    Invalid Account
                </h1>
                </div>
                </div>}
                <Form.Item 
                label="Amount" name="amount"
                rules={[
                    {
                        required:true,
                        message:"Please input your amount!"
                    },{
                        max:user.balance,
                        message:"Insufficient Balance",
                    }
                ]}
                >
                    <input type='number' max={user.balance}/>
                </Form.Item>
                <Form.Item 
                label="Reference" name="reference"
                >
                    <textarea type='text'/>
                </Form.Item>
                <div className="flex justify-end gap-1">
                    <button className="primary-outlined-btn">Cancel</button>
                    {isVerified ==='true'&&<button className="primary-contained-btn">Transfer</button>}
                </div>
            </Form>

        </Modal>
    </div>
  )
}

export default TransferFundsModal