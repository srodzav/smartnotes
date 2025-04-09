import { pipeline } from "@xenova/transformers";

// Cache the pipeline
let embeddingPipeline;

async function getEmbeddingPipeline() {
    if (!embeddingPipeline) {
        embeddingPipeline = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );
    }
    return embeddingPipeline;
}

async function getEmbedding(text) {
    const pipe = await getEmbeddingPipeline();
    const result = await pipe(text, { pooling: "mean", normalize: true });
    return Array.from(result.data);
}

export { getEmbedding };
