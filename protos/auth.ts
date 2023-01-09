/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "authPackage";

export enum LoginCode {
  SUCCESS = 0,
  FAIL = 1,
  UNRECOGNIZED = -1,
}

export function loginCodeFromJSON(object: any): LoginCode {
  switch (object) {
    case 0:
    case "SUCCESS":
      return LoginCode.SUCCESS;
    case 1:
    case "FAIL":
      return LoginCode.FAIL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LoginCode.UNRECOGNIZED;
  }
}

export function loginCodeToJSON(object: LoginCode): string {
  switch (object) {
    case LoginCode.SUCCESS:
      return "SUCCESS";
    case LoginCode.FAIL:
      return "FAIL";
    case LoginCode.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface LoginResult {
  loginCode: LoginCode;
  token?: string | undefined;
}

export interface LoginRequest {
  username: string;
  password: string;
}

function createBaseLoginResult(): LoginResult {
  return { loginCode: 0, token: undefined };
}

export const LoginResult = {
  encode(message: LoginResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.loginCode !== 0) {
      writer.uint32(8).int32(message.loginCode);
    }
    if (message.token !== undefined) {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.loginCode = reader.int32() as any;
          break;
        case 2:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginResult {
    return {
      loginCode: isSet(object.loginCode) ? loginCodeFromJSON(object.loginCode) : 0,
      token: isSet(object.token) ? String(object.token) : undefined,
    };
  },

  toJSON(message: LoginResult): unknown {
    const obj: any = {};
    message.loginCode !== undefined && (obj.loginCode = loginCodeToJSON(message.loginCode));
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoginResult>, I>>(object: I): LoginResult {
    const message = createBaseLoginResult();
    message.loginCode = object.loginCode ?? 0;
    message.token = object.token ?? undefined;
    return message;
  },
};

function createBaseLoginRequest(): LoginRequest {
  return { username: "", password: "" };
}

export const LoginRequest = {
  encode(message: LoginRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLoginRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.username = reader.string();
          break;
        case 2:
          message.password = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LoginRequest {
    return {
      username: isSet(object.username) ? String(object.username) : "",
      password: isSet(object.password) ? String(object.password) : "",
    };
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {};
    message.username !== undefined && (obj.username = message.username);
    message.password !== undefined && (obj.password = message.password);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LoginRequest>, I>>(object: I): LoginRequest {
    const message = createBaseLoginRequest();
    message.username = object.username ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

export interface AuthService {
  login(request: LoginRequest): Promise<LoginResult>;
}

export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "authPackage.AuthService";
    this.rpc = rpc;
    this.login = this.login.bind(this);
  }
  login(request: LoginRequest): Promise<LoginResult> {
    const data = LoginRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "login", data);
    return promise.then((data) => LoginResult.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
