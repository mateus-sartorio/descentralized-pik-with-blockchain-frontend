import { ethers } from "ethers";
import React from "react";
import { useNoticesQuery } from "../../generated/graphql";

type Notice = {
  id: string;
  index: number;
  input: any, //{index: number; epoch: {index: number; }
  payload: string;
};

export const Notices: React.FC = () => {
  const [result, reexecuteQuery] = useNoticesQuery();
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... Looks like we are having some problems to reach the Cartesi backend...</p>;

  if (!data || !data.notices) return <p>No notices</p>;

  const notices: Notice[] = data.notices.edges.map((node: any) => {
    const n = node.node;
    let inputPayload = n?.input.payload;
    if (inputPayload) {
      try {
        inputPayload = ethers.utils.toUtf8String(inputPayload);
      } catch (e) {
        inputPayload = inputPayload + " (hex)";
      }
    } else {
      inputPayload = "(empty)";
    }
    let payload = n?.payload;
    if (payload) {
      try {
        payload = ethers.utils.toUtf8String(payload);
      } catch (e) {
        payload = payload + " (hex)";
      }
    } else {
      payload = "(empty)";
    }
    return {
      id: `${n?.id}`,
      index: parseInt(n?.index),
      payload: `${payload}`,
      input: n ? { index: n.input.index, payload: inputPayload } : {},
    };
  }).sort((b: any, a: any) => {
    if (a.input.index === b.input.index) {
      return b.index - a.index;
    } else {
      return b.input.index - a.input.index;
    }
  });

  // const forceUpdate = useForceUpdate();
  return (
    <div>
      <button onClick={() => reexecuteQuery({ requestPolicy: 'network-only' })}>
        Reload
      </button>
      <table>
        <thead>
          <tr>
            <th>Input Index</th>
            <th>Notice Index</th>
            {/* <th>Input Payload</th> */}
            <th>Payload</th>
          </tr>
        </thead>
        <tbody>
          {notices.length === 0 && (
            <tr>
              <td colSpan={4}>no notices</td>
            </tr>
          )}
          {notices.map((n: any) => (
            <tr key={`${n.input.index}-${n.index}`}>
              <td>{n.input.index}</td>
              <td>{n.index}</td>
              {/* <td>{n.input.payload}</td> */}
              <td>{n.payload}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};