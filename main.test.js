const test = require("node:test")
const assert = require("node:assert")

const hw = require("./main")

test("when n1 L then 12", (t) => {
    assert.strictEqual(hw.homework(1, "L"), '12')
})

test("when n1 R then 21", (t) => {
    assert.strictEqual(hw.homework(1, "R"), '21')
})

test("when n2 LL then 3214", (t) => {
    assert.strictEqual(hw.homework(2, "LL"), '3214')
})

test("when n2 LR then 4123", (t) => {
    assert.strictEqual(hw.homework(2, "LR"), '4123')
})

test("when n3 LRL then 54187236", (t) => {
    assert.strictEqual(hw.homework(3, "LRL"), '54187236')
})