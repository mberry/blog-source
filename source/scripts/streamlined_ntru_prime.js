import * as wasm from './streamlined_ntru_prime_bg';

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* @returns {Keys}
*/
export function generate_key() {
    return Keys.__wrap(wasm.generate_key());
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Uint8Array} pk
* @returns {Encapsulated}
*/
export function encapsulate(pk) {
    const ptr0 = passArray8ToWasm(pk);
    const len0 = WASM_VECTOR_LEN;
    return Encapsulated.__wrap(wasm.encapsulate(ptr0, len0));
}

/**
* @param {Uint8Array} cstr
* @param {Uint8Array} sk
* @returns {Uint8Array}
*/
export function decapsulate(cstr, sk) {
    const ptr0 = passArray8ToWasm(cstr);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm(sk);
    const len1 = WASM_VECTOR_LEN;
    const retptr = globalArgumentPtr();
    wasm.decapsulate(retptr, ptr0, len0, ptr1, len1);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];

    const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 1);
    return realRet;

}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

export function __wbg_new_3a746f2619705add(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}

function getObject(idx) { return heap[idx]; }

export function __wbg_call_f54d3a6dadb199ca(arg0, arg1) {
    return addHeapObject(getObject(arg0).call(getObject(arg1)));
}

export function __wbg_self_ac379e780a0d8b94(arg0) {
    return addHeapObject(getObject(arg0).self);
}

export function __wbg_crypto_1e4302b85d4f64a2(arg0) {
    return addHeapObject(getObject(arg0).crypto);
}

export function __wbg_getRandomValues_1b4ba144162a5c9e(arg0) {
    return addHeapObject(getObject(arg0).getRandomValues);
}

export function __wbg_getRandomValues_1ef11e888e5228e9(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).getRandomValues(varg1);
}

export function __wbg_require_6461b1e9a0d7c34a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(require(varg0));
}

export function __wbg_randomFillSync_1b52c8482374c55b(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).randomFillSync(varg1);
}

export function __wbindgen_is_undefined(i) { return getObject(i) === undefined ? 1 : 0; }

export function __wbindgen_jsval_eq(a, b) { return getObject(a) === getObject(b) ? 1 : 0; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

export function __wbindgen_rethrow(idx) { throw takeObject(idx); }

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

function freeEncapsulated(ptr) {

    wasm.__wbg_encapsulated_free(ptr);
}
/**
*/
export class Encapsulated {

    static __wrap(ptr) {
        const obj = Object.create(Encapsulated.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeEncapsulated(ptr);
    }

    /**
    * @returns {Uint8Array}
    */
    cipher_text() {
        const retptr = globalArgumentPtr();
        wasm.encapsulated_cipher_text(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
    /**
    * @returns {Uint8Array}
    */
    shared_key() {
        const retptr = globalArgumentPtr();
        wasm.encapsulated_shared_key(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
}

function freeKeys(ptr) {

    wasm.__wbg_keys_free(ptr);
}
/**
*/
export class Keys {

    static __wrap(ptr) {
        const obj = Object.create(Keys.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeKeys(ptr);
    }

    /**
    * @returns {Uint8Array}
    */
    public() {
        const retptr = globalArgumentPtr();
        wasm.keys_public(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
    /**
    * @returns {Uint8Array}
    */
    private() {
        const retptr = globalArgumentPtr();
        wasm.keys_private(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getArrayU8FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

