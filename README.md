# About The Project


## Build Project Using PNPM
### Server Side:

```
TYPE=server npm run build-pnpm
```
### Client Side:
```
TYPE=client npm run build-pnpm
```
## Build Project Using NPM
### Server Side:
```
TYPE=server npm run build
```
### Client Side:
```
TYPE=client npm run build
```

## Access React app created with Vite on local network when running in WSL.

Example result of running ipconfig in windows:
```bash
Wireless LAN adapter Wi-Fi:

   Connection-specific DNS Suffix  . : speedport.ip
   IPv6 Address. . . . . . . . . . . : 2003:ea:ef29:5bd2:b728:766a:9b25:eaf3
   Temporary IPv6 Address. . . . . . : 2003:ea:ef29:5bd2:8dee:f06d:11cc:53e8
   Link-local IPv6 Address . . . . . : fe80::a4af:89c6:8ac8:e6c%7
   IPv4 Address. . . . . . . . . . . : 192.168.2.53
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : fe80::1%7
                                       192.168.2.1

Wireless LAN adapter Local Area Connection* 2:

   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::46d4:6164:303e:e786%21
   IPv4 Address. . . . . . . . . . . : 192.168.137.1
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . :

Ethernet adapter vEthernet (Default Switch):

   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::203a:426e:1d5b:d9cb%26
   IPv4 Address. . . . . . . . . . . : 172.30.80.1
   Subnet Mask . . . . . . . . . . . : 255.255.240.0
   Default Gateway . . . . . . . . . :
```
`

running ifconfig in console of ubunti, which runs at WSL2:
```bash
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.20.13.67  netmask 255.255.240.0  broadcast 172.20.15.255
        inet6 fe80::215:5dff:fef5:150d  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:f5:15:0d  txqueuelen 1000  (Ethernet)
        RX packets 571  bytes 97999 (97.9 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 46  bytes 2476 (2.4 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 19  bytes 1672 (1.6 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 19  bytes 1672 (1.6 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

In this example we are using `192.168.2.53` and `172.20.13.67`


```
                              ┌────────────────────────────────────────┐
                              │                                        │
                              │    Windows: 192.168.2.53               │
                              │          ┌──────────────────────────┐  │
                              │          │Ubuntu Server on WSL      │  │
┌────────────────────┐        │          │172.20.13.67              │  │
│                    │        │          │                          │  │
│ Mobile Device      │        │          │                          │  │
│                    │        │          │                          │  │
│                    │        │          │                          │  │
│ Connect to:        │        │          │                          │  │
│ 198.168.2.53:5173  │        │          │                          │  │
│                    │        │          │                          │  │
│                    │        │          │                          │  │
│                    │        │          └──────────────────────────┘  │
└────────────────────┘        └────────────────────────────────────────┘
```

### Port Forwarding on windows
```bash
netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=172.20.13.67
```
```bash
netsh interface portproxy add v4tov4 listenport=8000 listenaddress=0.0.0.0 connectport=8000 connectaddress=172.20.13.67
```

Seeing the List of portforawarding:
```bash
netsh interface portproxy show all
```

### Allowing Firewall on windows PowerShell
```bash
New-NetFirewallRule -DisplayName "Allow React" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow
```

```bash
netsh advfirewall firewall add rule name="ExpressServerOutbound" dir=out action=allow protocol=TCP localport=8000
```
### Running Vite in Host Mode
#### Using Script configuration:

#### Using command



```
project-root/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── taskController.js
│   └── containerController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── user.js
│   ├── task.js
│   └── container.js
│
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
│   └── containerRoutes.js
│
├── utils/
│   └── getUserTasks.js
│
├── test/
│   └── addRandomDataToDb.js
│
├── .env
├── server.js
├── package.json
└── README.md
```
