

type Credentials
    = UserCredentials
    | AnonymousCredentials;

interface AnonymousCredentials { }

interface UserCredentials {
    username: string;
    password: string;
}
