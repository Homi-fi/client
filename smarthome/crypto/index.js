const { generateKeyPair, publicEncrypt, privateDecrypt } = require('crypto');
generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
}, (err, publicKey, privateKey) => {
console.log(publicKey);
console.log(`PrivateKey: ${privateKey}`);
//message to be encrypted
// var toEncrypt = "Please Open the Door";
// var encryptBuffer = Buffer.from(toEncrypt);

//encrypt using public key
// var encrypted = publicEncrypt(publicKey,encryptBuffer);
// console.log(typeof encrypted)
//print out the text and cyphertext
// console.log("Text to be encrypted:");
// console.log(toEncrypt);
// console.log("cipherText:");
// console.log(encrypted.toString());

//decrypt the cyphertext using the private key
// var decryptBuffer = Buffer.from(encrypted.toString("base64"), "base64");
// var decrypted = privateDecrypt(privateKey,decryptBuffer);
// console.log(decrypted.toString())
});


`-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1K73OkLBUn/l3k3j/ziv
5AmgL+LInZRFZjcSesVxPCcmHI94NLMsxymDy4ytc9t4IS3pRNR8qWoDJ8jGdT3Z
m5OsYMRlMBmifnOMLSh9WRe800huN08zODhFtzyg2g0FcuCvw4dOe2IfnP21AsB8
xXhsDKtw5UZapIKmVWYE2xZZJOHZPcBiaieyFTk4Uqg3xOGHD0fFnNAfPQal8IP0
CwzjKEX3BcxTheFjNkcpW8oDeNZr5EwZtZxiNea/FFMQVyUwpnFUMc/R9td+BgeA
Ov8bCSWEoweuclixou8BFezFm9HIA9+hyVmu3CkOCwj76ifNrxo4+IPifeBHs/JD
LmPqlrjr3Yl5bfxyIzpP+J50h67z7Y/NS3KgJsuS/QqpesRklNyn4ziLXk1OwpVo
5BikLzZK5/ig2gqB9YhcuC1rkKfqUxJGW0TGtFdhQrLY+03Ngq1FmKQ/Rscl/C7s
L7tTIaPVDmtK/FHzeFE600QqvQRSxt6Ad9t8KtIO6M59LUbL3wfHwBHGJ+5J8L9q
I2d66s9e8BMQgjysqsoseVUXdVO9PaZSUEOU5D0ArqjRVk0SOZeGH/uKWlO8Ei3I
YkNt2mo/twkTe5WgkNJL6SC4QEyC8r8Y24Yilb00X9Gc/0kQ1WuwdQIYAqmIJYsi
DG3owF9vauLw03pcbzsdmskCAwEAAQ==
-----END PUBLIC KEY-----`


export const privKey = 
`-----BEGIN PRIVATE KEY-----
MIIJQgIBADANBgkqhkiG9w0BAQEFAASCCSwwggkoAgEAAoICAQDUrvc6QsFSf+Xe
TeP/OK/kCaAv4sidlEVmNxJ6xXE8JyYcj3g0syzHKYPLjK1z23ghLelE1HypagMn
yMZ1Pdmbk6xgxGUwGaJ+c4wtKH1ZF7zTSG43TzM4OEW3PKDaDQVy4K/Dh057Yh+c
/bUCwHzFeGwMq3DlRlqkgqZVZgTbFlkk4dk9wGJqJ7IVOThSqDfE4YcPR8Wc0B89
BqXwg/QLDOMoRfcFzFOF4WM2RylbygN41mvkTBm1nGI15r8UUxBXJTCmcVQxz9H2
134GB4A6/xsJJYSjB65yWLGi7wEV7MWb0cgD36HJWa7cKQ4LCPvqJ82vGjj4g+J9
4Eez8kMuY+qWuOvdiXlt/HIjOk/4nnSHrvPtj81LcqAmy5L9Cql6xGSU3KfjOIte
TU7ClWjkGKQvNkrn+KDaCoH1iFy4LWuQp+pTEkZbRMa0V2FCstj7Tc2CrUWYpD9G
xyX8Luwvu1Mho9UOa0r8UfN4UTrTRCq9BFLG3oB323wq0g7ozn0tRsvfB8fAEcYn
7knwv2ojZ3rqz17wExCCPKyqyix5VRd1U709plJQQ5TkPQCuqNFWTRI5l4Yf+4pa
U7wSLchiQ23aaj+3CRN7laCQ0kvpILhATILyvxjbhiKVvTRf0Zz/SRDVa7B1AhgC
qYgliyIMbejAX29q4vDTelxvOx2ayQIDAQABAoICABmMv1R3aoP/q1yuXMJvS+oI
If8+rj0H7+JcoVKwX28LgO+TaKxkDfALE7MjPj8Z0W+i9U/4etVbT++6leTFvluL
PP0O+tzxZ2zrcp6GK7DFQkDbhaoNUKjjUbS2ithHEi1/wn2pxorZ+dRBQjqHZzXN
xqUq/0/7yK3UqCjALbsoDyN4IkHh17DK/gDAs/xyCukS8seqJpo1AluxbcPcBjhB
nxRae1dt+Wau8d02ZUiKlyowEBwH7Fq946p4AuJtLBxb8mE8YhHt1lph/ti4k/YC
aXwKzslLBfDkqMpbDfVVUVPruqyEdAodRP1bzT0UIjc5+uKbMtbf+RiIFfUPGHTF
Kcyb92h3VDjycWu9GeAIAWzbSgT702tThzOrk8yi33MnI7StC4koyRq/+kWuZXwX
8JALsgKE2VOTfTnLla3Zl+CRNt6sBVLH1/Ymt8dKmCI/4iZD6Q9ubIo/BovXMB/O
4q5n5Hp5G6OYB2JURJsJ/S4fpPO51i6rvSJlCu1q45HLLsubN/IW5wYlvkuZWsGE
zoah6Oc55LowsIp/4hJGEe+CqDvXnrFl0qc8Z/wwq4N9O46dS5DeGjA7/K/maAb0
tiV69Li+rSaZTuTjs7Llgqu6VN2JwNL7gxti4rSVyObU2qmBmO2TgVxjJLPvbsZz
zJbliF0zan5tsv7W9h0BAoIBAQDqLxAjsccItBte8C/4gsJ9JkURpyhnRIUlgRES
+2ehYaYEWOOhCEYsiVscNl9IBku64AYoos5eRfDLCgmYofi/X/oC90ysW/W9g8fQ
2zCILOTMFi4o4I1Y75ay8RKF1NFCvL62Ug0eXasThDiDmXOuElqvFMrBnQgJRY8W
v4Yu2EvYDO/8bVVv48KpclIuq4ANhor4kbTPCLMsKuhDXtI9gIvUTad4i76ni1kb
rw2Pi51CLjV/F7TftQrFGLfC9gkYfzF1wykxtwaUXxwoLEyFHwUV3GyGdIgYUpez
SdYHWAv20QA6tr3FAgHVUOd+jlDLyPEG9iwtogv06hs8yxipAoIBAQDofyaJpoxA
sQYM7bxJpoueemvzqrurK9agR9qMfCIN8JbaSnRe5YyVUK8q0aTM+SloP2WwCmwJ
PYkBiBKrXXHWXbgZu7f4/IwN/AGbPSMHzRB9myqRv47fGSs7XOl5W9DUhv8ulJWe
zJVPoufkCUCtNQb32mh/BnkGmm2/foTN2ZmDzBPBMsTvTT3/NfAP+BDY/nCrFR7S
GGOutPd7TnoNeFxLD4R+qJaZqXTKIsEKdGDd61ZNGgiYbvirD0+FdG4E4o7GsnnE
DMiOfXERgX+hCvcXi7Pi6tyzjopg/dZqM18nJjsWsDDmbq2rLWuAmrH1EluueHDS
pbNB5YxHxyUhAoIBACRIim2dW8MjdKIvAJ+2Ur/lMApeJcpqOV7oMmcIgLPmVzyR
MSOADq9T0MP8QKL+JrmbgBjHsMW2fGpY8ceuQMYV7ryK6FxEGzzzr//SFiDjI8fj
H9/BeuTuqiCrbT1DDfETIVFKQTIVPS5W7BKnsd6khVxfElMRK2+UUWkq33VemdGt
n3kyz2v4k+6BAe6tL7fowptkp+jz5h7PvxDBHj3dLs0EAxCQRkfbNUEuzCETdpgM
ZMl+OM34VOTYwY/5Ysti2ZzvUfCb9O8EFW67/lcZyUXr0vy6DWQHV+21YO3eXGwv
UaPHMHvXpcURNezLzATm60Ey3wFq/ANESlgO95ECggEBANtUAAYBIPRyS3Ps3iBY
xgPGF4qx+QK8g2eHAWxgOjwOSDE75dYUFPBTQjxRs3dOYjqe/A37dvmsnE/ej0Ys
DBUfKmrURPTVQkZ7AwTwwtg8Ip9rvtfp7x0WAEurFfHPpQypIZhOwWsiMoUC+GGO
PP5pNN6iosuaTpflHT12XFBZQ9IqtkQe4duicacNuh9GdJZQSfeLIB0wtvD8dS9U
1B1a+y4wQFzAK/pf+vYpnRSAv1T7CtoHgi5TGbE961XJhXSESg62FdrV+Gk7e2v5
T26cCoei2htqVrPo9zASprBfMBedoEaCBk+L/7epTG3xAYphPC42HrEJcjbrFtAr
1SECggEAFXT9oGV8IWQmBZxDuoxJyHmmbdDo2hqVI2rd04qtt/JLcp1d01hT9sMd
tBc7yJ4t7CgG4E3TkGCOdHAaHxpbIOb+PCiZb74cV0IUgwsWN08T698j8lRRSgxB
Xnehc3POu7FLyrbtQscg6UanWvvXntrxBoH/RGhbCoYRe0sVajyZfQybwH31ZISX
mP5MNRTk/zqGAyU+0I/Sra0bSqT27rqrX7V4bfaDIjVrQCEnV2IaCiZmT2+3ASjW
scEeBIcBqGQ+JglGwod/u8Y/Dq7Mos0TYgKpe0V2xhzwK5C7mtCNm6DIUI/nXNGT
zyH59y++snqTlXeOGh8kPX1m2SR1qQ==
-----END PRIVATE KEY-----`

