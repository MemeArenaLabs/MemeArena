#!/bin/bash

# WIF
#Token created with address: 4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY
#Token account created with address: 3kL2DgRZmcbb4PXE42FivG73uWNHF829CzsnwcJdNSo7

TOKEN_ADDRESS_WIF="4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY"
TOKEN_ACCOUNT_WIF="3kL2DgRZmcbb4PXE42FivG73uWNHF829CzsnwcJdNSo7"
# Mint some tokens to the token account
#spl-token mint $TOKEN_ADDRESS_WIF 10000000000 $TOKEN_ACCOUNT_WIF

# Transfer tokens from the token account to another address
RECIPIENT_ADDRESS_FRANCO="HsAdvNNVWtmnXRMDKYz12JNXq15beZdSkwyJjX7PxtFb"
RECIPIENT_ADDRESS_RAQUEL="ETqMTjGZUj2a3Jhp41X7PtNUMFDVJfnmdXRihy6rTxtG"
#spl-token transfer $TOKEN_ADDRESS_WIF 100000000 $RECIPIENT_ADDRESS_FRANCO --from $TOKEN_ACCOUNT_WIF --fund-recipient
#spl-token transfer $TOKEN_ADDRESS_WIF 100000000 $RECIPIENT_ADDRESS_RAQUEL --from $TOKEN_ACCOUNT_WIF --fund-recipient


##Token created with address: B1Yhn1aypY8sDLbdamcrFvZsVRGXPzvo5nDgyeaSmhzU
##Token account created with address: H2mWpW3sKybLV12EZ9UwJSkbwUWaZsgs1fW7PmpM88tf

TOKEN_ADDRESS_BONK="B1Yhn1aypY8sDLbdamcrFvZsVRGXPzvo5nDgyeaSmhzU"
TOKEN_ACCOUNT_BONK="H2mWpW3sKybLV12EZ9UwJSkbwUWaZsgs1fW7PmpM88tf"

spl-token mint $TOKEN_ADDRESS_BONK 20000000 $TOKEN_ACCOUNT_BONK

spl-token transfer $TOKEN_ADDRESS_BONK 10000000 $RECIPIENT_ADDRESS_FRANCO --from $TOKEN_ACCOUNT_BONK --fund-recipient
spl-token transfer $TOKEN_ADDRESS_BONK 10000000 $RECIPIENT_ADDRESS_RAQUEL --from $TOKEN_ACCOUNT_BONK --fund-recipient


#Token created with address: 7iiZfGagYpn1c2C9KXKeSRFRVHFBBQeQsqAnVHGoJ3s5
#Token account created with address: 5Z4RqNkMHjWiEBDyUMibJHCwYGbj1kz4cDBDTfw23iw9

TOKEN_ADDRESS_MOO="7iiZfGagYpn1c2C9KXKeSRFRVHFBBQeQsqAnVHGoJ3s5"
TOKEN_ACCOUNT_MOO="5Z4RqNkMHjWiEBDyUMibJHCwYGbj1kz4cDBDTfw23iw9"

spl-token mint $TOKEN_ADDRESS_MOO 20000000 $TOKEN_ACCOUNT_MOO

spl-token transfer $TOKEN_ADDRESS_MOO 10000000 $RECIPIENT_ADDRESS_FRANCO --from $TOKEN_ACCOUNT_MOO --fund-recipient
spl-token transfer $TOKEN_ADDRESS_MOO 10000000 $RECIPIENT_ADDRESS_RAQUEL --from $TOKEN_ACCOUNT_MOO --fund-recipient


#Token created with address: HzZGhbJQ9T6VZrffMtEVtGt51sNhKSAEHEY4T8xEud9Q
#Token account created with address: 6dMhpNfZZgM7aEjm5JdDeBLjtAxpSaGioWxmNWriGivm

TOKEN_ADDRESS_POP="HzZGhbJQ9T6VZrffMtEVtGt51sNhKSAEHEY4T8xEud9Q"
TOKEN_ACCOUNT_POP="6dMhpNfZZgM7aEjm5JdDeBLjtAxpSaGioWxmNWriGivm"

spl-token mint $TOKEN_ADDRESS_POP 20000000 $TOKEN_ACCOUNT_POP

spl-token transfer $TOKEN_ADDRESS_POP 10000000 $RECIPIENT_ADDRESS_FRANCO --from $TOKEN_ACCOUNT_POP --fund-recipient
spl-token transfer $TOKEN_ADDRESS_POP 10000000 $RECIPIENT_ADDRESS_RAQUEL --from $TOKEN_ACCOUNT_POP --fund-recipient

#Token created with address: 2HHGkN3PEKiDT2ZiE65VuW6BvjdUQsxySmdZ2JF4RAf3
#Token account created with address: GTbYi1jVDcnpXKnXCNcDrLfPKjAYh4XBBpk6ZD8DqTKx

TOKEN_ADDRESS_GIGA="2HHGkN3PEKiDT2ZiE65VuW6BvjdUQsxySmdZ2JF4RAf3"
TOKEN_ACCOUNT_GIGA="GTbYi1jVDcnpXKnXCNcDrLfPKjAYh4XBBpk6ZD8DqTKx"

spl-token mint $TOKEN_ADDRESS_GIGA 20000000 $TOKEN_ACCOUNT_GIGA

spl-token transfer $TOKEN_ADDRESS_GIGA 10000000 $RECIPIENT_ADDRESS_FRANCO --from $TOKEN_ACCOUNT_GIGA --fund-recipient
spl-token transfer $TOKEN_ADDRESS_GIGA 10000000 $RECIPIENT_ADDRESS_RAQUEL --from $TOKEN_ACCOUNT_GIGA --fund-recipient
