import crypto from "crypto";

const EMAIL_REGEX =
  /^(?=.{6,254}$)[A-Za-z0-9_\-\b.]{1,64}\b@[A-Za-z0-9_\-\b.]+\.[A-Za-z]{2,}$/;
const AMOUNT_REGEX = /^\d+(\.\d{1,2})?$/;

function validateParams(params: any) {
  Object.keys(params).forEach((k) => {
    if (typeof params[k] !== "string") {
      throw new TypeError(`TypeError: Param "${k}" required of type String`);
    }
  });
  const {
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
  } = params;

  if (!EMAIL_REGEX.test(email)) {
    throw new Error("ArgumentError: Invalid Email");
  }
  if (!AMOUNT_REGEX.test(amount)) {
    throw new Error(
      "ArgumentError: amount should contain digits with upto 2 decimal places"
    );
  }
  if (txnid.length > 25) {
    throw new Error(
      "ArgumentError: txnid length should be less than equal to 25"
    );
  }
  if (productinfo.length > 100) {
    throw new Error(
      "ArgumentError: productinfo length should be less than equal to 100"
    );
  }
  if (firstname.length > 60) {
    throw new Error(
      "ArgumentError: firstname length should be less than equal to 60"
    );
  }
  if (email.length > 50) {
    throw new Error(
      "ArgumentError: email length should be less than equal to 50"
    );
  }
  [udf1, udf2, udf3, udf4, udf5].forEach((udf) => {
    if (udf.length > 255) {
      throw new Error(
        "ArgumentError: udf length should be less than equal to 255"
      );
    }
  });
}

export function generateHash({
  key = "W1udhf",
  salt = "e9nLWRVOfUntpbZBk1JQ6C9Of9O4avqk",
  txnid,
  amount,
  productinfo,
  firstname,
  email,
  udf1 = "",
  udf2 = "",
  udf3 = "",
  udf4 = "",
  udf5 = "",
}: any) {
  validateParams({
    key,
    salt,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
  });
  const cryp = crypto.createHash("sha512");
  const text =
    key +
    "|" +
    txnid +
    "|" +
    amount +
    "|" +
    productinfo +
    "|" +
    firstname +
    "|" +
    email +
    "|" +
    udf1 +
    "|" +
    udf2 +
    "|" +
    udf3 +
    "|" +
    udf4 +
    "|" +
    udf5 +
    "||||||" +
    salt;
  cryp.update(text);
  return cryp.digest("hex");
}

export function validateHash(
  hash: string,
  {
    key = "W1udhf",
    salt = "e9nLWRVOfUntpbZBk1JQ6C9Of9O4avqk",
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
    status,
    additionalCharges,
  }: any
) {
  validateParams({
    key,
    salt,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1,
    udf2,
    udf3,
    udf4,
    udf5,
  });
  if (typeof status !== "string") {
    throw new TypeError('TypeError: Param "status" required of type String');
  }
  const keyString =
    key +
    "|" +
    txnid +
    "|" +
    amount +
    "|" +
    productinfo +
    "|" +
    firstname +
    "|" +
    email +
    "|" +
    udf1 +
    "|" +
    udf2 +
    "|" +
    udf3 +
    "|" +
    udf4 +
    "|" +
    udf5 +
    "|||||";
  const keyArray = keyString.split("|");
  const reverseKeyArray = keyArray.reverse();
  let reverseKeyString = salt + "|" + status + "|" + reverseKeyArray.join("|");
  if (additionalCharges) {
    reverseKeyString = additionalCharges + "|" + reverseKeyString;
  }
  const cryp = crypto.createHash("sha512");
  cryp.update(reverseKeyString);
  const calchash = cryp.digest("hex");
  return calchash === hash;
}
