import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Blockscon } from '/imports/api/blocks/blocks.js';
import { Transactions } from '/imports/api/transactions/transactions.js';
import Block from './Block.jsx';

export default BlockContainer = withTracker((props) => {
    let blockHandle, transactionHandle;
    let loading = true;

    if (Meteor.isClient){
        blockHandle = Meteor.subscribe('blocks.findOne', parseInt(props.match.params.blockId));
        transactionHandle = Meteor.subscribe('transactions.height', parseInt(props.match.params.blockId));
        loading = !blockHandle.ready() && !transactionHandle.ready();    
    }

    let block, txs, transactionsExist, blockExist;

    if (Meteor.isServer || !loading){
        block = Blockscon.findOne({height: parseInt(props.match.params.blockId)});
        txs = Transactions.find({height:parseInt(props.match.params.blockId)});

        if (Meteor.isServer){
            loading = false;
            transactionsExist = !!txs;
            blockExist = !!block;
        }
        else{
            transactionsExist = !loading && !!txs;
            blockExist = !loading && !!block;
        }
        
    }

    return {
        loading,
        blockExist,
        transactionsExist,
        block: blockExist ? block : {},
        transferTxs: transactionsExist ? Transactions.find({
            $or: [
                {"tx.value.msg.type":"chain-demo/MsgSend"},
                {"tx.value.msg.type":"chain-demo/MsgMultiSend"}
            ]
        }).fetch() : {},
        stakingTxs: transactionsExist ? Transactions.find({
            $or: [
                {"tx.value.msg.type":"chain-demo/MsgCreateValidator"},
                {"tx.value.msg.type":"chain-demo/MsgEditValidator"},
                {"tx.value.msg.type":"chain-demo/MsgDelegate"},
                {"tx.value.msg.type":"chain-demo/MsgUndelegate"},
                {"tx.value.msg.type":"chain-demo/MsgBeginRedelegate"}
            ]
        }).fetch() : {},
        distributionTxs: transactionsExist ? Transactions.find({
            $or: [
                {"tx.value.msg.type":"chain-demo/MsgWithdrawValidatorCommission"},
                {"tx.value.msg.type":"chain-demo/MsgWithdrawDelegationReward"},
                {"tx.value.msg.type":"chain-demo/MsgModifyWithdrawAddress"}
            ]
        }).fetch() : {},
        governanceTxs: transactionsExist ? Transactions.find({
            $or: [
                {"tx.value.msg.type":"chain-demo/MsgSubmitProposal"},
                {"tx.value.msg.type":"chain-demo/MsgDeposit"},
                {"tx.value.msg.type":"chain-demo/MsgVote"}
            ]
        }).fetch() : {},
        slashingTxs: transactionsExist ? Transactions.find({
            $or: [
                {"tx.value.msg.type":"chain-demo/MsgUnjail"}
            ]
        }).fetch() : {},
        IBCTxs: transactionsExist ? Transactions.find({
            $or: [
                {"tx.value.msg.type":"chain-demo/IBCTransferMsg"},
                {"tx.value.msg.type":"chain-demo/IBCReceiveMsg"}
            ]
        }).fetch() : {},
    };
})(Block);
