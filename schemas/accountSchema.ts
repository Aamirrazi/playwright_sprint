import Ajv from "ajv";

export const ajv = new Ajv({ allErrors: true });

const accountSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    customerId: { type: "integer" },
    type: { type: "string" },
    balance: { type: "number" },
  },
  required: ["id", "customerId", "type", "balance"],
  additionalProperties: false,
};

export const validateAccount = ajv.compile(accountSchema);
