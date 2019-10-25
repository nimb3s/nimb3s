# Firebase Configuration

-   [Different Environments](#env)
-   [Cloud Firestore](#fs)
    -   [Setup](#fs-setup)
    -   [Security Rules](#fs-security)
    -   [Writing Security Rules](#fs-security-writting)

## <a name="fs"></a> Cloud Firestore

For more information please see the [Gogole Cloud Firestore Security docs.](https://firebase.google.com/docs/firestore/security/get-started)

### <a name="fs-setup"></a>1. Setup Firestore

0.  Don't forget to login: `firebase login` 
1.  Specify a target: `firebase use stage-nimb3s`. Targets are defined in [.firebasesrc](https://github.com/nimb3s/nimb3s/blob/master/src/spas/.firebaserc)
2.  Initialize firestore: `firebase init firestore`

### <a name="fs-security-rules"></a>2. Configure Security Rules

The gist: 
-   Security rules are defined in [`firestore.rules`](https://github.com/nimb3s/nimb3s/blob/master/src/spas/firestore.rules).
-   Firebase knows about these rules through [`firebase.json`:](https://github.com/nimb3s/nimb3s/blob/master/src/spas/firebase.json)

``` json
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  }
}
```

### <a name="fs-security-rules"></a>2. Deploying Security Rules

1.  `firestore deploy --only firestore:rules`
2.  If the deploy was successfull you'll see something like this in the console:

```
=== Deploying to 'stage-nimb3s'...

i  deploying firestore
i  firestore: checking firestore.rules for compilation errors...
+  firestore: rules file firestore.rules compiled successfully
i  firestore: uploading rules firestore.rules...
+  firestore: released rules firestore.rules to cloud.firestore

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/{project-name}/overview
```

### <a name="fs-mono"></a>Dealing With a Mono Repo

With a monorepo there needs to be some trickery in place to tell firebase to only deploy security rules for a particular project. How do we do that?

What we foundout about Firebase is that the CLI does not support specifying the path to `firestore.rules` when deploying the security rules that are specific to a project. We couldn't do something like this`firestore deploy --only firestore:rules --rulesFilePath spas/apps/nimb3s/firestore.rules`.

Based on [this github issue we found]() by ooogleling around, someone had already requested the feature to be added to the CLI. Sad news... there is no timeframe when it will be added. Good news... the article points out that we can specify a relative path in the [`firebase.json`]((https://github.com/nimb3s/nimb3s/blob/master/src/spas/firebase.json) that contains our project specific security rules (This is the same for Firestore indexes through `firestore.indexes.json`).

So what does this mean? That we can do some type of trickery to switch the firebase.json when we are about to deploy our security rules.

When is it done and by who? This is done through our CI/CD pipeline. Through the `Publish-FirebaseSecurityRules` powershell func.

### <a name="fs-security-writting"></a>Writting Security Rules

See this [intro into security youtube video](https://www.youtube.com/watch?v=eW5MdE3ZcAw)

