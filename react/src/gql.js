import gql from "graphql-tag";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, split, from } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import Observable from 'zen-observable';
import { transformResponse } from "./transform";

var graphqlEndpoint = window.location.host
var graphqlHttpEndpoint = window.location.origin

if (process.env.NODE_ENV === 'development') {
    graphqlEndpoint = 'localhost:8080'
    graphqlHttpEndpoint = 'http://' + graphqlEndpoint
}

// Transform response data (eg convert date string to Date object)
const transformResponseLink = new ApolloLink((operation, forward) => {
    const res = forward(operation)
    return Observable.from(res).map(data => {
        transformResponse(data)
        return data
    });
});

// HTTP Link
const httpLink = new HttpLink({
    uri: `${graphqlHttpEndpoint}/graphql/query`,
});

// WebSocket Link
const wsLink = new WebSocketLink({
    uri: `ws://${graphqlEndpoint}/graphql/subscription`,
    options: {
        reconnect: true,
        minTimeout: 5000,
        lazy: true,
    },
});

// Send query request based on the type definition
const link = from([
    transformResponseLink,
    split(
    ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink
    )
]);

const cache = new InMemoryCache();

const gqlClient = new ApolloClient({
    link,
    cache
});

const EpochQuery = gql`
    query AppEpochQuery {
        epoch {
            Epoch
            SecondsPerEpoch
        }
    }
`;

const DealsListQuery = gql`
    query AppDealsListQuery($query: String, $cursor: ID, $offset: Int, $limit: Int) {
        deals(query: $query, cursor: $cursor, offset: $offset, limit: $limit) {
            deals {
                ID
                CreatedAt
                ClientAddress
                Checkpoint
                CheckpointAt
                IsOffline
                Err
                Retry
                Message
                Transfer {
                    Type
                    Size
                    Params
                }
                Transferred
                TransferSamples {
                    At
                    Bytes
                }
                IsTransferStalled
                Sector {
                    ID
                    Offset
                    Length
                }
            }
            totalCount
            more
        }
    }
`;

const LegacyDealsListQuery = gql`
    query AppLegacyDealsListQuery($cursor: ID, $offset: Int, $limit: Int) {
        legacyDeals(cursor: $cursor, offset: $offset, limit: $limit) {
            deals {
                ID
                CreatedAt
                PieceCid
                PieceSize
                ClientAddress
                StartEpoch
                EndEpoch
                ProviderCollateral
                ClientPeerID
                DealDataRoot
                PublishCid
                Status
                Message
                SectorNumber
            }
            totalCount
            more
        }
    }
`;

const DealsCountQuery = gql`
    query AppDealCountQuery {
        dealsCount
    }
`;

const LegacyDealsCountQuery = gql`
    query AppLegacyDealCountQuery {
        legacyDealsCount
    }
`;

const DealSubscription = gql`
    subscription AppDealSubscription($id: ID!) {
        dealUpdate(id: $id) {
            ID
            CreatedAt
            PieceCid
            PieceSize
            IsVerified
            ProposalLabel
            ClientAddress
            StartEpoch
            EndEpoch
            ProviderCollateral
            ClientCollateral
            StoragePricePerEpoch
            ClientPeerID
            DealDataRoot
            SignedProposalCid
            InboundFilePath
            ChainDealID
            PublishCid
            IsOffline
            Checkpoint
            CheckpointAt
            Retry
            Err
            Message
            Transferred
            Transfer {
                Type
                Size
                Params
            }
            Sector {
                ID
                Offset
                Length
            }
            Logs {
                CreatedAt
                LogMsg
                LogParams
                Subsystem
            }
        }
    }
`;

const ProposalLogsListQuery = gql`
    query AppProposalLogsListQuery($accepted: Boolean, $cursor: BigInt, $offset: Int, $limit: Int) {
        proposalLogs(accepted: $accepted, cursor: $cursor, offset: $offset, limit: $limit) {
            logs {
                DealUUID
                Accepted
                Reason
                CreatedAt
                ClientAddress
                PieceSize
            }
            totalCount
            more
        }
    }
`;

const ProposalLogsCountQuery = gql`
    query AppProposalLogsCountQuery {
        proposalLogsCount {
            Accepted
            Rejected
            Period
        }
    }
`;

const DealCancelMutation = gql`
    mutation AppDealCancelMutation($id: ID!) {
        dealCancel(id: $id)
    }
`;

const DealRetryPausedMutation = gql`
    mutation AppDealRetryMutation($id: ID!) {
        dealRetryPaused(id: $id)
    }
`;

const DealFailPausedMutation = gql`
    mutation AppDealRetryMutation($id: ID!) {
        dealFailPaused(id: $id)
    }
`;

const NewDealsSubscription = gql`
    subscription AppNewDealsSubscription {
        dealNew {
            deal {
                ID
                CreatedAt
                PieceCid
                PieceSize
                ClientAddress
                StartEpoch
                EndEpoch
                ProviderCollateral
                ClientPeerID
                DealDataRoot
                SignedProposalCid
                PublishCid
                Checkpoint
                CheckpointAt
                Retry
                Err
                Message
                Transfer {
                    Type
                    Size
                    Params
                }
                Sector {
                    ID
                    Offset
                    Length
                }
                Logs {
                    CreatedAt
                    LogMsg
                    LogParams
                    Subsystem
                }
            }
            totalCount
        }
    }
`;

const LegacyDealQuery = gql`
    query AppLegacyDealQuery($id: ID!) {
        legacyDeal(id: $id) {
            ID
            CreatedAt
            PieceCid
            PieceSize
            ClientAddress
            StartEpoch
            EndEpoch
            ProviderCollateral
            ClientPeerID
            DealDataRoot
            PublishCid
            TransferType
            Transferred
            TransferSize
            Status
            Message
            SectorNumber
            FundsReserved
            ChainDealID
            InboundCARPath
            AvailableForRetrieval
        }
    }
`;

const PiecesWithPayloadCidQuery = gql`
    query AppPiecesWithPayloadCidQuery($payloadCid: String!) {
        piecesWithPayloadCid(payloadCid: $payloadCid)
    }
`;

const PieceStatusQuery = gql`
    query AppPieceStatusQuery($pieceCid: String!) {
        pieceStatus(pieceCid: $pieceCid) {
            PieceCid
            IndexStatus {
                Status
                Error
            }
            Deals {
                SealStatus {
                    IsUnsealed
                    Error
                }
                Deal {
                    ID
                    IsLegacy
                    CreatedAt
                    DealDataRoot
                }
                Sector {
                    ID
                    Offset
                    Length
                }
            }
            PieceInfoDeals {
                ChainDealID
                Sector {
                    ID
                    Offset
                    Length
                }
                SealStatus {
                    IsUnsealed
                    Error
                }
            }
        }
    }
`;

const StorageQuery = gql`
    query AppStorageQuery {
        storage {
            Staged
            Transferred
            Pending
            Free
            MountPoint
        }
    }
`;

const LegacyStorageQuery = gql`
    query AppLegacyStorageQuery {
        legacyStorage {
            Capacity
            Used
            MountPoint
        }
    }
`;

const SealingPipelineQuery = gql`
    query AppSealingPipelineQuery {
        sealingpipeline {
            WaitDealsSectors {
                SectorID
                Used
                SectorSize
                Deals {
                    ID
                    Size
                    IsLegacy
                }
            }
            SnapDealsWaitDealsSectors {
                SectorID
                Used
                SectorSize
                Deals {
                    ID
                    Size
                    IsLegacy
                }
            }
            SectorStates {
                Regular {
                    Key
                    Value
                    Order
                }
                RegularError {
                    Key
                    Value
                    Order
                }
                SnapDeals {
                    Key
                    Value
                    Order
                }
                SnapDealsError {
                    Key
                    Value
                    Order
                }
            }
            Workers {
                ID
                Start
                Stage
                Sector
            }
        }
    }
`;

const FundsQuery = gql`
    query AppFundsQuery {
        funds {
            Escrow {
                Tagged
                Available
                Locked
            }
            Collateral {
                Address
                Balance
            }
            PubMsg {
                Address
                Balance
                Tagged
            }
        }
    }
`;

const TransfersQuery = gql`
    query AppTransfersQuery {
        transfers {
            At
            Bytes
        }
    }
`;

const TransferStatsQuery = gql`
    query AppTransferStatsQuery {
        transferStats {
            HttpMaxConcurrentDownloads
            HttpMaxConcurrentDownloadsPerPeer
            Stats {
                Host
                Total
                Started
                Stalled
                TransferSamples {
                    At
                    Bytes
                }
            }
        }
    }
`;

const FundsLogsQuery = gql`
    query AppFundsLogsQuery($cursor: BigInt, $offset: Int, $limit: Int) {
        fundsLogs(cursor: $cursor, offset: $offset, limit: $limit) {
            totalCount
            more
            logs {
                CreatedAt
                DealUUID
                Amount
                Text
            }
        }
    }
`;

const DealPublishQuery = gql`
    query AppDealPublishQuery {
        dealPublish {
            Start
            Period
            MaxDealsPerMsg
            Deals {
                ID
                IsLegacy
                CreatedAt
                Transfer {
                    Size
                }
                ClientAddress
                PieceSize
            }
        }
    }
`;

const DealPublishNowMutation = gql`
    mutation AppDealPublishNowMutation {
        dealPublishNow
    }
`;

const FundsMoveToEscrow = gql`
    mutation AppDealPublishNowMutation($amount: BigInt!) {
        fundsMoveToEscrow(amount: $amount)
    }
`;

const StorageAskUpdate = gql`
    mutation AppStorageAskUpdateMutation($update: StorageAskUpdate!) {
        storageAskUpdate(update: $update)
    }
`;

const MpoolQuery = gql`
    query AppMpoolQuery($local: Boolean!) {
        mpool(local: $local) {
            From
            To
            Nonce
            Value
            GasFeeCap
            GasLimit
            GasPremium
            Method
            Params
            BaseFee
        }
    }
`;

const Libp2pAddrInfoQuery = gql`
    query AppLibp2pAddrInfoQuery {
        libp2pAddrInfo {
            PeerID
            Addresses
            Protocols
        }
    }
`;

const StorageAskQuery = gql`
    query AppStorageAskQuery {
        storageAsk {
            Price
            VerifiedPrice
            MinPieceSize
            MaxPieceSize
            ExpiryEpoch
            ExpiryTime
        }
    }
`;

export {
    gqlClient,
    EpochQuery,
    DealsListQuery,
    LegacyDealsListQuery,
    DealsCountQuery,
    LegacyDealsCountQuery,
    LegacyDealQuery,
    DealSubscription,
    DealCancelMutation,
    DealRetryPausedMutation,
    DealFailPausedMutation,
    NewDealsSubscription,
    ProposalLogsListQuery,
    ProposalLogsCountQuery,
    PiecesWithPayloadCidQuery,
    PieceStatusQuery,
    StorageQuery,
    LegacyStorageQuery,
    FundsQuery,
    FundsLogsQuery,
    DealPublishQuery,
    DealPublishNowMutation,
    FundsMoveToEscrow,
    StorageAskUpdate,
    TransfersQuery,
    TransferStatsQuery,
    MpoolQuery,
    SealingPipelineQuery,
    Libp2pAddrInfoQuery,
    StorageAskQuery,
}
