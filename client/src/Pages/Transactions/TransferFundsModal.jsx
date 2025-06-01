import React from 'react'
import {Modal} from 'antd';
import {Form} from 'antd';
import {useDispatch } from 'react-redux';
import {ShowLoading,HideLoading} from "../../redux/loadersSlice";

function TransferFundsModal({showTransferFundsModal,
    setShowTransferFundsModal,reloadData}) {
    const [isVerified,setIsVerified]=React.useState(false);
    const [form]=Form.useForm();
    const dispatch=useDispatch();
    const verifyAccount=async()=>{
        try {
            dispatch(ShowLoading());
            const response =await VerifyAccount({
                receiver:form.getFieldValue("receiver") 
            })
            if(response.success){
                setIsVerified(true);
            }else{
                setIsVerified(false);
            }
        } catch (error) {
            dispatch(HideLoading());
        }
    }
  return (
    <div>
        <Modal title="Transfer Funds"
        open={showTransferFundsModal}
        onCancel={()=>setShowTransferFundsModal(false)}
        footer={null}
        >
            <Form layout='vertical' form={form}>
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
                    Account Verified
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
                >
                    <input type='text'/>
                </Form.Item>
                <Form.Item 
                label="Description" name="description"
                >
                    <textarea type='text'/>
                </Form.Item>
            </Form>

        </Modal>
    </div>
  )
}

export default TransferFundsModal