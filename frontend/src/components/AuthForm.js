import { useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const data = useActionData();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <Form method="POST" className={classes.form}>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            <button> {isLogin ? "Create new user" : "Login"}</button>
          </Link>

          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
