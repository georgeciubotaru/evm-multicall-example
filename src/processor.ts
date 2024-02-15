import { lookupArchive } from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import { Store } from '@subsquid/typeorm-store'
import * as erc721 from './abi/erc721'

export const CONTRACT_ADDRESS = '0xac5c7493036de60e63eb81c5e9a440b42f47ebf5'
export const MULTICALL_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11'

export const processor = new EvmBatchProcessor()
    // .setDataSource({
    //     // archive: lookupArchive('eth-mainnet'),
    //     chain: 'https://rpc.ankr.com/eth',
    // })
    .setRpcEndpoint({
        url: 'https://rpc.ankr.com/polygon_zkevm/bea1b19b2d5ad332a01aa74dea339b1934cb2c60b0903082438a206bd3adc8f8',
        rateLimit: 30
    })
    .setFinalityConfirmation(10)
    .setBlockRange({
        from: 19_231_037,
    })
    .setFields({
        evmLog: {
            topics: true,
            data: true,
        },
        transaction: {
            hash: true,
        },
    })
    .addLog({
        address: [CONTRACT_ADDRESS],
        topic0: [erc721.events.Transfer.topic],
        transaction: true,
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
