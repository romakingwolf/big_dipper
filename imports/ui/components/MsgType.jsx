import React from 'react';
import { Badge } from 'reactstrap';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

export const MsgType = (props) => {
    switch (props.type){
    // bank
    case "chain-demo/MsgSend":
        return <Badge color="success"><T>messageTypes.send</T></Badge>
    case "chain-demo/MsgMultiSend":
        return <Badge color="success"><T>messageTypes.multiSend</T></Badge>
        
        // staking
    case "chain-demo/MsgCreateValidator":
        return <Badge color="warning"><T>messageTypes.createValidator</T></Badge>;
    case "chain-demo/MsgEditValidator":
        return <Badge color="warning"><T>messageTypes.editValidator</T></Badge>;
    case "chain-demo/MsgDelegate":
        return <Badge color="warning"><T>messageTypes.delegate</T></Badge>;
    case "chain-demo/MsgUndelegate":
        return <Badge color="warning"><T>messageTypes.undelegate</T></Badge>;
    case "chain-demo/MsgBeginRedelegate":
        return <Badge color="warning"><T>messageTypes.redelegate</T></Badge>;
        
        // gov
    case "chain-demo/MsgSubmitProposal":
        return <Badge color="info"><T>messageTypes.submitProposal</T></Badge>
    case "chain-demo/MsgDeposit":
        return <Badge color="info"><T>messageTypes.deposit</T></Badge>
    case "chain-demo/MsgVote":
        return <Badge color="info"><T>messageTypes.vote</T></Badge>;
        
        // distribution
    case "chain-demo/MsgWithdrawValidatorCommission":
        return <Badge color="secondary"><T>messageTypes.withdrawComission</T></Badge>;
    case "chain-demo/MsgWithdrawDelegationReward":
        return <Badge color="secondary"><T>messageTypes.withdrawReward</T></Badge>;
    case "chain-demo/MsgModifyWithdrawAddress":
        return <Badge color="secondary"><T>messgeTypes.modifyWithdrawAddress</T></Badge>;

        // slashing
    case "chain-demo/MsgUnjail":
        return <Badge color="danger"><T>messageTypes.unjail</T></Badge>;
        
        // ibc
    case "chain-demo/IBCTransferMsg":
        return <Badge color="dark"><T>messageTypes.IBCTransfer</T></Badge>;
    case "chain-demo/IBCReceiveMsg":
        return <Badge color="dark"><T>messageTypes.IBCReceive</T></Badge>;

    default:
        return <Badge color="primary">{props.type}</Badge>;
    }
}
