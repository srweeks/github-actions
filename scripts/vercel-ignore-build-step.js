const https = require("https");

if (process.env.VERCEL_ENV !== "production") {
  console.log("✅ - Build can proceed");
  process.exit(1);
}

const req = https.request(
  {
    hostname: "api.vercel.com",
    port: 443,
    path: `/v6/now/deployments?limit=5&teamId=${process.env.VERCEL_IGNORE_BUILD_STEP_TEAM_ID}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_IGNORE_BUILD_STEP_ACCESS_TOKEM}`,
    },
  },
  (res) => {
    let data = "";

    res.on("data", (d) => {
      data += d.toString();
    });
    res.on("end", (d) => {
      let parsedData = JSON.parse(data);
      let prodRunningFromDeployHook = false;

      try {
        prodRunningFromDeployHook = parsedData.deployments.find(
          ({ state, meta, target }) =>
            state === "BUILDING" &&
            target === "production" &&
            meta.deployHookId ===
              process.env.VERCEL_IGNORE_BUILD_STEP_DEPLOY_HOOK_ID
        );
      } catch (e) {
        console.log("e: ", e);
        process.exit(0);
      }

      if (!prodRunningFromDeployHook) {
        console.log("🛑 - Build cancelled");
        process.exit(0);
      }

      console.log("✅ - Build can proceed");
      process.exit(1);
    });
  }
);

req.on("error", (error) => {
  console.error(error);
  process.exit(0);
});

req.end();
