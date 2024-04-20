const homework = (n, lr) => {
    
    // checkArgs()

    // ２次元配列で連続した数字の紙配列を作成
    // １要素目：紙の高さ。まだ折ってないので、１配列目に全ての数字が存在
    // ２要素目：その高さに存在している数字の紙。
    let numbers = generateNumbers(n)
    
    // 渡された n の回数分折るので、n 回繰り返す
    for(let foldCount = 1; foldCount <= n; foldCount++) {

        if(isL(lr.substr(foldCount - 1, 1))) {
            numbers = operationL(numbers)
        }

        if(isR(lr.substr(foldCount - 1, 1))) {
            numbers = operationR(numbers)
        }
    }

    // 折り終わった状態で上から数字を数える
    return arrayToString(numbers)

}

function generateNumbers(n) {
    let max_keta = 2 ** n
    let numbers = Array(1)
    numbers[0] = Array(max_keta - 1)
    for(let i = 0; i < max_keta; i++) {
        numbers[0][i] = String(i + 1)
    }
    return numbers
}

function isL(lrString) {
    if(lrString === 'l' || lrString === 'L'){
        return true
    }
    return false
}

function isR(lrString) {
    if(lrString === 'r' || lrString === 'R'){
        return true
    }
    return false
}

function operationL(oldNumbers) {

    // 紙を左端から右端に折る。折ることで紙の高さが倍になる
    // 配列の１要素目を２倍にして、前半について・・・
    // 　配列の１要素目を最後から最初まで繰り返し、
    // 　２要素目の前半半分の数字を順番を反転して入れる
    // 後半については、上記前半で移動しなかったものを詰めて入れる
    // ex N:3, LLL として、２回目に折っている状況
    //   [ [4, 3, 2, 1],
    //     [5, 6, 7, 8] ]
    //   ↓
    //   [ [6, 5],
    //     [3, 4],
    //     [2, 1],
    //     [7, 8] ]
    let newNumbers = Array(oldNumbers.length * 2 - 1)
    let halfCount = oldNumbers[0].length / 2

    // 前半
    for(let oldPaperCount = oldNumbers.length - 1, newPaperCount = 0; oldPaperCount >= 0; oldPaperCount--, newPaperCount++) {

        newNumbers[newPaperCount] = Array(halfCount - 1)
        for(let oldNumberCount = 0, newNumberCount = halfCount - 1; oldNumberCount < halfCount; oldNumberCount++, newNumberCount--) {
            newNumbers[newPaperCount][newNumberCount] = oldNumbers[oldPaperCount][oldNumberCount]
        }
    }

    // 後半
    for(let oldPaperCount = 0, newPaperCount = oldNumbers.length; oldPaperCount < oldNumbers.length; oldPaperCount++, newPaperCount++) {

        newNumbers[newPaperCount] = Array(halfCount - 1)
        for(let oldNumberCount = halfCount, newNumberCount = 0; oldNumberCount < oldNumbers[oldPaperCount].length; oldNumberCount++, newNumberCount++) {
            newNumbers[newPaperCount][newNumberCount] = oldNumbers[oldPaperCount][oldNumberCount]
        }
    }

    return newNumbers
}

function operationR(oldNumbers) {

    // 紙を右端から左端に折る。折ることで紙の高さが倍になる
    // 配列の１要素目を２倍にして、前半について・・・
    // 　配列の１要素目を最後から最初まで繰り返し、
    // 　２要素目の後半半分の数字を順番を反転して入れる
    // 後半については、上記前半で移動しなかったものを詰めて入れる
    // ex N:3, RRR として、２回目に折っている状況
    //   [ [8, 7, 6, 5],
    //     [1, 2, 3, 4] ]
    //   ↓
    //   [ [4, 3],
    //     [5, 6],
    //     [8, 7],
    //     [1, 2] ]
    let newNumbers = Array(oldNumbers.length * 2 - 1)
    let halfCount = oldNumbers[0].length / 2

    // 前半
    for(let oldPaperCount = oldNumbers.length - 1, newPaperCount = 0; oldPaperCount >= 0; oldPaperCount--, newPaperCount++) {

        newNumbers[newPaperCount] = Array(halfCount - 1)
        for(let oldNumberCount = oldNumbers[oldPaperCount].length - 1, newNumberCount = 0; oldNumberCount > halfCount - 1; oldNumberCount--, newNumberCount++) {
            newNumbers[newPaperCount][newNumberCount] = oldNumbers[oldPaperCount][oldNumberCount]
        }
    }

    // 後半
    for(let oldPaperCount = 0, newPaperCount = oldNumbers.length; oldPaperCount < oldNumbers.length; oldPaperCount++, newPaperCount++) {

        newNumbers[newPaperCount] = Array(halfCount - 1)
        for(let oldNumberCount = 0, newNumberCount = 0; oldNumberCount < halfCount; oldNumberCount++, newNumberCount++) {
            newNumbers[newPaperCount][newNumberCount] = oldNumbers[oldPaperCount][oldNumberCount]
        }
    }

    return newNumbers
}

function arrayToString(numbers) {
    let resultNumbers = ''
    for(let count = 0; count < numbers.length; count++) {
        resultNumbers = resultNumbers.concat(String(numbers[count][0]))
    }
    return resultNumbers
}

module.exports = {
    homework,
}