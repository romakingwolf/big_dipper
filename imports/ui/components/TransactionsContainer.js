import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Transactions } from '/imports/api/transactions/transactions.js';
import ValidatorTransactions from './Transactions.jsx';

export default TransactionsContainer = withTracker((props) => {
    let transactionsHandle, transactions, transactionsExist;
    let loading = true;

    if (Meteor.isClient){
        transactionsHandle = Meteor.subscribe('transactions.validator', props.validator, props.delegator, props.limit);
        loading = !transactionsHandle.ready();
    }

    if (Meteor.isServer || !loading){
        transactions = Transactions.find({}, {sort:{height:-1}});

        if (Meteor.isServer){
            loading = false;
            transactionsExist = !!transactions;
        }
        else{
            transactionsExist = !loading && !!transactions;
        }
    }

    return {
        loading,
        transactionsExist,
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
        }).fetch() : {}
    };
})(ValidatorTransactions);
