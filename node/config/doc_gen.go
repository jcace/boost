// Code generated by github.com/filecoin-project/lotus/node/config/cfgdocgen. DO NOT EDIT.

package config

type DocField struct {
	Name    string
	Type    string
	Comment string
}

var Doc = map[string][]DocField{
	"API": []DocField{
		{
			Name: "ListenAddress",
			Type: "string",

			Comment: `Binding address for the Lotus API`,
		},
		{
			Name: "RemoteListenAddress",
			Type: "string",

			Comment: ``,
		},
		{
			Name: "Timeout",
			Type: "Duration",

			Comment: ``,
		},
	},
	"Backup": []DocField{
		{
			Name: "DisableMetadataLog",
			Type: "bool",

			Comment: `Note that in case of metadata corruption it might be much harder to recover
your node if metadata log is disabled`,
		},
	},
	"Boost": []DocField{
		{
			Name: "SealerApiInfo",
			Type: "string",

			Comment: ``,
		},
		{
			Name: "SectorIndexApiInfo",
			Type: "string",

			Comment: ``,
		},
		{
			Name: "Dealmaking",
			Type: "DealmakingConfig",

			Comment: ``,
		},
		{
			Name: "DAGStore",
			Type: "DAGStoreConfig",

			Comment: ``,
		},
		{
			Name: "Wallets",
			Type: "WalletsConfig",

			Comment: ``,
		},
	},
	"Common": []DocField{
		{
			Name: "API",
			Type: "API",

			Comment: ``,
		},
		{
			Name: "Backup",
			Type: "Backup",

			Comment: ``,
		},
		{
			Name: "Libp2p",
			Type: "Libp2p",

			Comment: ``,
		},
	},
	"DAGStoreConfig": []DocField{
		{
			Name: "RootDir",
			Type: "string",

			Comment: `Path to the dagstore root directory. This directory contains three
subdirectories, which can be symlinked to alternative locations if
need be:
- ./transients: caches unsealed deals that have been fetched from the
storage subsystem for serving retrievals.
- ./indices: stores shard indices.
- ./datastore: holds the KV store tracking the state of every shard
known to the DAG store.
Default value: <LOTUS_MARKETS_PATH>/dagstore (split deployment) or
<LOTUS_MINER_PATH>/dagstore (monolith deployment)`,
		},
		{
			Name: "MaxConcurrentIndex",
			Type: "int",

			Comment: `The maximum amount of indexing jobs that can run simultaneously.
0 means unlimited.
Default value: 5.`,
		},
		{
			Name: "MaxConcurrentReadyFetches",
			Type: "int",

			Comment: `The maximum amount of unsealed deals that can be fetched simultaneously
from the storage subsystem. 0 means unlimited.
Default value: 0 (unlimited).`,
		},
		{
			Name: "MaxConcurrencyStorageCalls",
			Type: "int",

			Comment: `The maximum number of simultaneous inflight API calls to the storage
subsystem.
Default value: 100.`,
		},
		{
			Name: "GCInterval",
			Type: "Duration",

			Comment: `The time between calls to periodic dagstore GC, in time.Duration string
representation, e.g. 1m, 5m, 1h.
Default value: 1 minute.`,
		},
	},
	"DealmakingConfig": []DocField{
		{
			Name: "ConsiderOnlineStorageDeals",
			Type: "bool",

			Comment: `When enabled, the miner can accept online deals`,
		},
		{
			Name: "ConsiderOfflineStorageDeals",
			Type: "bool",

			Comment: `When enabled, the miner can accept offline deals`,
		},
		{
			Name: "ConsiderOnlineRetrievalDeals",
			Type: "bool",

			Comment: `When enabled, the miner can accept retrieval deals`,
		},
		{
			Name: "ConsiderOfflineRetrievalDeals",
			Type: "bool",

			Comment: `When enabled, the miner can accept offline retrieval deals`,
		},
		{
			Name: "ConsiderVerifiedStorageDeals",
			Type: "bool",

			Comment: `When enabled, the miner can accept verified deals`,
		},
		{
			Name: "ConsiderUnverifiedStorageDeals",
			Type: "bool",

			Comment: `When enabled, the miner can accept unverified deals`,
		},
		{
			Name: "PieceCidBlocklist",
			Type: "[]cid.Cid",

			Comment: `A list of Data CIDs to reject when making deals`,
		},
		{
			Name: "ExpectedSealDuration",
			Type: "Duration",

			Comment: `Maximum expected amount of time getting the deal into a sealed sector will take
This includes the time the deal will need to get transferred and published
before being assigned to a sector`,
		},
		{
			Name: "MaxDealStartDelay",
			Type: "Duration",

			Comment: `Maximum amount of time proposed deal StartEpoch can be in future`,
		},
		{
			Name: "PublishMsgPeriod",
			Type: "Duration",

			Comment: `When a deal is ready to publish, the amount of time to wait for more
deals to be ready to publish before publishing them all as a batch`,
		},
		{
			Name: "PublishMsgMaxDealsPerMsg",
			Type: "uint64",

			Comment: `The maximum number of deals to include in a single PublishStorageDeals
message`,
		},
		{
			Name: "PublishMsgMaxFee",
			Type: "types.FIL",

			Comment: `The maximum network fees to pay when sending the PublishStorageDeals message`,
		},
		{
			Name: "MaxProviderCollateralMultiplier",
			Type: "uint64",

			Comment: `The maximum collateral that the provider will put up against a deal,
as a multiplier of the minimum collateral bound`,
		},
		{
			Name: "MaxStagingDealsBytes",
			Type: "int64",

			Comment: `The maximum allowed disk usage size in bytes of staging deals not yet
passed to the sealing node by the markets service. 0 is unlimited.`,
		},
		{
			Name: "SimultaneousTransfersForStorage",
			Type: "uint64",

			Comment: `The maximum number of parallel online data transfers for storage deals`,
		},
		{
			Name: "SimultaneousTransfersForRetrieval",
			Type: "uint64",

			Comment: `The maximum number of parallel online data transfers for retrieval deals`,
		},
		{
			Name: "StartEpochSealingBuffer",
			Type: "uint64",

			Comment: `Minimum start epoch buffer to give time for sealing of sector with deal.`,
		},
		{
			Name: "Filter",
			Type: "string",

			Comment: `A command used for fine-grained evaluation of storage deals
see https://docs.filecoin.io/mine/lotus/miner-configuration/#using-filters-for-fine-grained-storage-and-retrieval-deal-acceptance for more details`,
		},
		{
			Name: "RetrievalFilter",
			Type: "string",

			Comment: `A command used for fine-grained evaluation of retrieval deals
see https://docs.filecoin.io/mine/lotus/miner-configuration/#using-filters-for-fine-grained-storage-and-retrieval-deal-acceptance for more details`,
		},
		{
			Name: "RetrievalPricing",
			Type: "*RetrievalPricing",

			Comment: ``,
		},
	},
	"Libp2p": []DocField{
		{
			Name: "ListenAddresses",
			Type: "[]string",

			Comment: `Binding address for the libp2p host - 0 means random port.
Format: multiaddress; see https://multiformats.io/multiaddr/`,
		},
		{
			Name: "AnnounceAddresses",
			Type: "[]string",

			Comment: `Addresses to explicitally announce to other peers. If not specified,
all interface addresses are announced
Format: multiaddress`,
		},
		{
			Name: "NoAnnounceAddresses",
			Type: "[]string",

			Comment: `Addresses to not announce
Format: multiaddress`,
		},
		{
			Name: "BootstrapPeers",
			Type: "[]string",

			Comment: ``,
		},
		{
			Name: "ProtectedPeers",
			Type: "[]string",

			Comment: ``,
		},
		{
			Name: "DisableNatPortMap",
			Type: "bool",

			Comment: `When not disabled (default), lotus asks NAT devices (e.g., routers), to
open up an external port and forward it to the port lotus is running on.
When this works (i.e., when your router supports NAT port forwarding),
it makes the local lotus node accessible from the public internet`,
		},
		{
			Name: "ConnMgrLow",
			Type: "uint",

			Comment: `ConnMgrLow is the number of connections that the basic connection manager
will trim down to.`,
		},
		{
			Name: "ConnMgrHigh",
			Type: "uint",

			Comment: `ConnMgrHigh is the number of connections that, when exceeded, will trigger
a connection GC operation. Note: protected/recently formed connections don't
count towards this limit.`,
		},
		{
			Name: "ConnMgrGrace",
			Type: "Duration",

			Comment: `ConnMgrGrace is a time duration that new connections are immune from being
closed by the connection manager.`,
		},
	},
	"RetrievalPricing": []DocField{
		{
			Name: "Strategy",
			Type: "string",

			Comment: ``,
		},
		{
			Name: "Default",
			Type: "*RetrievalPricingDefault",

			Comment: ``,
		},
		{
			Name: "External",
			Type: "*RetrievalPricingExternal",

			Comment: ``,
		},
	},
	"RetrievalPricingDefault": []DocField{
		{
			Name: "VerifiedDealsFreeTransfer",
			Type: "bool",

			Comment: `VerifiedDealsFreeTransfer configures zero fees for data transfer for a retrieval deal
of a payloadCid that belongs to a verified storage deal.
This parameter is ONLY applicable if the retrieval pricing policy strategy has been configured to "default".
default value is true`,
		},
	},
	"RetrievalPricingExternal": []DocField{
		{
			Name: "Path",
			Type: "string",

			Comment: `Path of the external script that will be run to price a retrieval deal.
This parameter is ONLY applicable if the retrieval pricing policy strategy has been configured to "external".`,
		},
	},
	"WalletsConfig": []DocField{
		{
			Name: "Miner",
			Type: "string",

			Comment: `The "owner" address of the miner`,
		},
		{
			Name: "PublishStorageDeals",
			Type: "string",

			Comment: `The wallet used to send PublishStorageDeals messages.
Must be a control or worker address of the miner.`,
		},
		{
			Name: "PledgeCollateral",
			Type: "string",

			Comment: `The wallet used as the source for pledge collateral`,
		},
	},
}
