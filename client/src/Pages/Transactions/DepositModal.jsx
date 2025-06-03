import React from 'react'
import {Modal, Form} from 'antd';

function DepositModal({
    showDepositModal, setShowDepositModal,reloadData
}) {
    const [amount=10,setAmount]=React.useState(10);
  return (
    <Modal title="Deposit" open={showDepositModal} onCancel={()=>setShowDepositModal(false)} footer={null}>
        <div className="flex-col gap-1">
            <Form layout='vertical'>
                <Form.Item label="Amount" name="amount" rules={[{
                    required:true,
                    message:"Please input amount"
                }]}>
                <input type='number' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
            </Form.Item>
            <div className="flex justify-end">
                <button className='primary-outlined-btn'>Cancel</button>
            </div>
            </Form>
        </div>
    </Modal>
  )
}

export default DepositModal