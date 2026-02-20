# Connecting ChiefClaw to OpenClaw

> How to run OpenClaw with the clawg-ui plugin and connect the ChiefClaw dashboard.

---

## What you need

1. **OpenClaw** running locally with the **clawg-ui** plugin enabled.
2. A **device token** from the pairing flow (one-time per device).
3. ChiefClaw frontend pointing at `http://localhost:18789/v1/clawg-ui` (default).

---

## Step 1: Run OpenClaw with clawg-ui

Install the clawg-ui channel plugin and start the gateway:

```bash
# Install the plugin (if not already)
openclaw plugins install @contextableai/clawg-ui

# Start the gateway (listens on port 18789 by default)
openclaw gateway run
```

Ensure the gateway is running and the `clawg-ui` channel is enabled. The plugin registers the HTTP endpoint at **`/v1/clawg-ui`**.

---

## Step 2: Get a device token (pairing)

ChiefClaw uses **device pairing**: you get a one-time token per device and approve it on the gateway.

### Option A: Pair from the browser (recommended)

1. Open ChiefClaw Dashboard and click **Connect to OpenClaw**.
2. Leave the token field **empty** and submit (or use any placeholder).
3. The app will call the gateway without a token and receive a **403** with pairing info in the response body.  
   *(Currently the app may show "Connection Error" because it doesn’t parse the 403 pairing response. Use Option B to get the token, then paste it in.)*

### Option B: Pair from the command line

**1. Initiate pairing** (no auth header):

```bash
curl -s -X POST http://localhost:18789/v1/clawg-ui \
  -H "Content-Type: application/json" \
  -d '{}'
```

You’ll get a **403** response with JSON like:

```json
{
  "error": {
    "type": "pairing_pending",
    "message": "Device pending approval",
    "pairing": {
      "pairingCode": "ABCD1234",
      "token": "MmRlOTA0ODIt...b71d",
      "instructions": "Save this token and run: openclaw pairing approve clawg-ui ABCD1234"
    }
  }
}
```

**2. Approve the device** (on the machine running OpenClaw):

```bash
# List pending pairings (optional)
openclaw pairing list clawg-ui

# Approve using the pairing code from the response
openclaw pairing approve clawg-ui ABCD1234
```

**3. Save the `token`** from the JSON. This is your **device token** (Bearer token).

---

## Step 3: Connect ChiefClaw

1. Open **Dashboard** in ChiefClaw.
2. In **“Connect your ChiefClaw”**, paste the **device token** (the `token` value from the pairing response) into the field labeled “Device token”.
3. Click **Connect to OpenClaw**.

The app sends `Authorization: Bearer <device-token>` to `http://localhost:18789/v1/clawg-ui`. If the gateway is running, clawg-ui is enabled, and the device is approved, the connection succeeds and the AI chat and tools work.

**Auto-connect:** Set `VITE_OPENCLAW_DEVICE_TOKEN=<your-token>` in `.env.local` (gitignored). The app will use it on load. Restart the dev server after changing `.env.local`.

**CORS:** The OpenClaw gateway does not send CORS headers. In development, Vite proxies `/v1/clawg-ui` to `http://localhost:18789` so the browser uses the same origin and the connection works. The app uses `runtimeUrl="/v1/clawg-ui"` so requests go through the proxy.

---

## If you see “Connection Error”

The error screen lists the usual causes:

| Cause | What to do |
|-------|------------|
| **OpenClaw is not running** | Run `openclaw gateway run` and ensure it stays up. |
| **clawg-ui plugin not enabled** | Run `openclaw plugins install @contextableai/clawg-ui` and restart the gateway. |
| **Port is not 18789** | ChiefClaw is hardcoded to `http://localhost:18789/v1/clawg-ui`. Change `runtimeUrl` in `src/App.jsx` to match your gateway port, or run OpenClaw on 18789. |

Also ensure the device is **approved** (Step 2). Unapproved tokens return 403 and can surface as a connection error.

---

## Summary

| Step | Action |
|------|--------|
| 1 | `openclaw plugins install @contextableai/clawg-ui` then `openclaw gateway run` |
| 2 | `curl -X POST http://localhost:18789/v1/clawg-ui -H "Content-Type: application/json" -d '{}'` → copy `pairingCode` and `token` |
| 3 | `openclaw pairing approve clawg-ui <pairingCode>` |
| 4 | In ChiefClaw Dashboard, paste the `token` and click Connect to OpenClaw |

For full clawg-ui details (auth, CLI, errors), see `clawgui/clawg-ui/README.md`.
