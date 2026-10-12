import formats from "@/registry/threadable/components/blocks/postcode-block/formats.json";

interface PostcodeFormatDefinition {
  iso: string;
  regex?: unknown;
  "zip format"?: unknown;
}

export type PostcodeMaskToken =
  | { kind: "digit" }
  | { kind: "letter" }
  | { kind: "alphanumeric" }
  | { kind: "literal"; value: string };

const definitions = formats as PostcodeFormatDefinition[];

export const findPostcodeRegex = (countryCode: string): string | undefined => {
  const definition = findPostcodeFormat(countryCode);
  const regex = definition?.regex;

  return typeof regex === "string" && regex.trim() !== "" && regex !== "–"
    ? regex
    : undefined;
};

export const findPostcodeFormatString = (
  countryCode: string,
): string | undefined => {
  const format = findPostcodeFormat(countryCode)?.["zip format"];

  return typeof format === "string" && format.trim() !== "" && format !== "–"
    ? format
    : undefined;
};

export const findPostcodeMaxLength = (
  countryCode: string,
): number | undefined => {
  const format = findPostcodeFormat(countryCode)?.["zip format"];

  if (
    typeof format !== "string" ||
    format.trim() === "" ||
    format === "–" ||
    format.includes("[") !== format.includes("]")
  ) {
    return undefined;
  }

  const maxLength = Array.from(format.replace(/[[\]]/g, "")).length;

  return maxLength > 0 ? maxLength : undefined;
};

const findPostcodeFormat = (
  countryCode: string,
): PostcodeFormatDefinition | undefined =>
  definitions.find(
    (entry) =>
      typeof entry.iso === "string" &&
      entry.iso.toUpperCase() === countryCode.toUpperCase(),
  );

export const compilePostcodeRegex = (
  pattern: string | undefined,
): RegExp | undefined => {
  if (!pattern) {
    return undefined;
  }

  try {
    return new RegExp(`^(?:${pattern})$`, "i");
  } catch {
    return undefined;
  }
};

/** Convert only the fixed-width regex subset into a mask; everything else stays unmasked. */
export const createPostcodeMask = (
  pattern: string | undefined,
): PostcodeMaskToken[] | undefined => {
  if (!pattern) {
    return undefined;
  }

  let source = pattern.replace(/^\^|\$$/g, "");
  const tokens: PostcodeMaskToken[] = [];

  while (source.length > 0) {
    let token: PostcodeMaskToken | undefined;
    let consumed = 0;

    if (source.startsWith("\\d")) {
      token = { kind: "digit" };
      consumed = 2;
    } else if (
      source.startsWith("[A-Z0-9]") ||
      source.startsWith("[A-Z\\d]") ||
      source.startsWith("[\\dA-Z]")
    ) {
      token = { kind: "alphanumeric" };
      consumed = source.startsWith("[A-Z0-9]") ? 8 : 7;
    } else if (source.startsWith("[A-Z]")) {
      token = { kind: "letter" };
      consumed = 5;
    } else if (source.startsWith("[0-9]")) {
      token = { kind: "digit" };
      consumed = 5;
    } else if (source.startsWith("\\s")) {
      token = { kind: "literal", value: " " };
      consumed = 2;
    } else if (source.startsWith("\\-")) {
      token = { kind: "literal", value: "-" };
      consumed = 2;
    } else if (/^[A-Z]$/i.test(source[0] ?? "") || source[0] === "-") {
      token = { kind: "literal", value: source[0]!.toUpperCase() };
      consumed = 1;
    } else if (source[0] === " ") {
      token = { kind: "literal", value: " " };
      consumed = 1;
    }

    if (!token) {
      return undefined;
    }

    source = source.slice(consumed);

    const quantifier = source.match(/^\{(\d+)\}/);
    const count = quantifier ? Number(quantifier[1]) : 1;

    if (quantifier) {
      source = source.slice(quantifier[0].length);
    }

    if (!Number.isSafeInteger(count) || count < 1 || count > 20) {
      return undefined;
    }

    if (token.kind === "literal" && count > 1) {
      return undefined;
    }

    for (let index = 0; index < count; index += 1) {
      tokens.push(token);
    }
  }

  return tokens.length > 0 ? tokens : undefined;
};

/** Build a formatting-only mask from a fixed display format without narrowing valid characters. */
export const createPostcodeFormatMask = (
  format: string | undefined,
): PostcodeMaskToken[] | undefined => {
  if (!format || format.includes("[") || format.includes("]")) {
    return undefined;
  }

  const tokens: PostcodeMaskToken[] = [];

  for (const character of Array.from(format)) {
    if (character === " " || character === "-") {
      tokens.push({ kind: "literal", value: character });
    } else if (/[A-Z0-9]/i.test(character)) {
      tokens.push({ kind: "alphanumeric" });
    } else {
      return undefined;
    }
  }

  return tokens.some((token) => token.kind === "literal") ? tokens : undefined;
};

export const formatPostcode = (
  value: string,
  mask: PostcodeMaskToken[] | undefined,
): { value: string; cursor: number } => {
  if (!mask) {
    return { value, cursor: value.length };
  }

  const input = value.toUpperCase();
  let inputIndex = 0;
  let output = "";
  let cursor = input.length;

  for (const token of mask) {
    if (token.kind === "literal") {
      if (inputIndex < input.length) {
        if (input[inputIndex] === token.value) {
          inputIndex += 1;
        }

        output += token.value;
      }

      continue;
    }

    while (inputIndex < input.length) {
      const character = input[inputIndex]!;
      inputIndex += 1;
      const matches =
        token.kind === "digit"
          ? /\d/.test(character)
          : token.kind === "letter"
            ? /[A-Z]/.test(character)
            : /[A-Z0-9]/.test(character);

      if (matches) {
        output += character;
        break;
      }
    }
  }

  if (inputIndex < input.length) {
    output += input.slice(inputIndex);
  }

  if (cursor > output.length) {
    cursor = output.length;
  }

  return { value: output, cursor };
};
