package gql

import (
	"context"

	gqltypes "github.com/filecoin-project/boost/gql/types"
	"github.com/filecoin-project/boost/storagemarket/types/dealcheckpoints"
)

// query: storage: [Storage]
func (r *resolver) Storage(ctx context.Context) (*storageResolver, error) {
	tagged, err := r.storageMgr.TotalTagged(ctx)
	if err != nil {
		return nil, err
	}

	free, err := r.storageMgr.Free(ctx)
	if err != nil {
		return nil, err
	}

	activeDeals, err := r.dealsDB.ListActive(ctx)
	if err != nil {
		return nil, err
	}

	transferred := uint64(0)
	for _, deal := range activeDeals {
		if deal.Checkpoint < dealcheckpoints.Transferred {
			transferred += r.provider.NBytesReceived(deal.DealUuid)
		} else {
			transferred += deal.Transfer.Size
		}
	}

	staged := uint64(0)
	return &storageResolver{
		Staged:      gqltypes.Uint64(staged),
		Transferred: gqltypes.Uint64(transferred),
		Pending:     gqltypes.Uint64(tagged - transferred),
		Free:        gqltypes.Uint64(free),
		MountPoint:  r.storageMgr.StagingAreaDirPath,
	}, nil
}