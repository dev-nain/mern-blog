function extractTextFromBlock(block) {
  if (!block || typeof block !== 'object') {
    return "";
  }
  let text = "";
  // Extract from this block's content
  if (Array.isArray(block.content)) {
    for (const item of block.content) {
      if (item && item.type === "text" && typeof item.text === "string") {
        text += item.text + " ";
      }
    }
  }
  // Recurse into children (if any)
  if (Array.isArray(block.children)) {
    for (const child of block.children) {
      text += extractTextFromBlock(child);
    }
  }
  return text;
}

export function extractTextFromBlocks(blocks) {
  if (!Array.isArray(blocks)) {
    return "";
  }
  return blocks.map(extractTextFromBlock).join(" ").trim();
}

const isLessThanAMinute = (minutes) => minutes < 1 + Number.EPSILON;

export function calculateReadingTime(text) {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const wordsPerMinute = 250;
  const minutes = Math.ceil(words / wordsPerMinute);
  const lessThanOne = isLessThanAMinute(minutes);
  return {
    minutes,
    text: lessThanOne
      ? "Less than a minute"
      : `${minutes} Min${minutes > 1 ? "s" : ""}`,
  };
}
