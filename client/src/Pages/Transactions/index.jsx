import React from 'react'
import PageTitle from '../../components/PageTitle'
import {Table} from 'antd';
import TransferFundsModal from './TransferFundsModal';

function Transactions() {
    const [showTransferFundsModal, setShowTransferFundsModal]=React.useState(false);
    const columns=[
        {
            title:"Date",
            dataIndex:"date",
        },{
            title:"Transaction ID",
            dataIndex:"transactionId"
        },
        {
            title:"Amount",
            dataIndex:"amount",
        },{
             title:"Type",
             dataIndex:"type",
        },{
            title:"Reference",
            dataIndex:"reference",
        },{
            title:"Status",
            dataIndex:"status",
        },
    ];
    const handleTransferClick = () => {
    console.log("Transfer button clicked");
    setShowTransferFundsModal(true);
  };

  return (
    <div> 
        <div className="flex justify-between items-center">
            <PageTitle title="Transactions"/>

            <div className='flex gap-1'>
                <button className='primary-outlined-btn'>
                    Deposit
                </button>
                <button className='primary-contained-btn'
                onClick={handleTransferClick}
                >
                    Transfer{" "}
                </button>
            </div>
        </div>
        <Table columns={columns} dataSource={[]}  className='mt-2'/>
        {showTransferFundsModal && (<TransferFundsModal 
        showTransferFundsModal={showTransferFundsModal} 
        setShowTransferFundsModal={setShowTransferFundsModal}
        />)}
    </div>
  );     
}

export default Transactions