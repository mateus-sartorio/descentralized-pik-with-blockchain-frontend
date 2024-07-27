import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-2">It seems this page does not exist :(</p>
      <p className="text-lg text-gray-600 italic">
        {/* <i>{error.statusText || error.message}</i> */}
      </p>
    </div>
  );
}