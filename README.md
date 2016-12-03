# chamberlain
Open and close your cloud connected myQ garage door through using requests.

# WARNING
You've got to be careful because this could potentially give people access to
your house, make sure you know what you're getting into before using this.

You need to create a `private.json` file with some keys:
```
{
  "username": (your MyChamberlain account username),
  "password": (your MyChamberlain account password),
  "secret": (a secret you use to validate a request)
}
```

Requests to the node server need to look like this:
```
url: <server address>/control
body: {
  "secret": (the secret you set in private.json),
  "action": (the action ot execute, either "open" or "close")
}
```
