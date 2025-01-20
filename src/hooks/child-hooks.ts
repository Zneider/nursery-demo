import { useMutation, useQuery } from "@tanstack/react-query";
import ky from "ky";
import { ChildrenResponse } from "../types";
import { queryClient } from "../client";

export const useChildren = () =>
  useQuery({
    queryKey: ["children"],
    queryFn: async (): Promise<ChildrenResponse> => {
      const params = new URLSearchParams();
      params.append("accessToken", import.meta.env.VITE_API_KEY);
      params.append("groupId", "86413ecf-01a1-44da-ba73-1aeda212a196");
      params.append("institutionId", "dc4bd858-9e9c-4df7-9386-0d91e42280eb");

      const json = await ky
        .get("https://app.famly.co/api/daycare/tablet/group", {
          searchParams: params,
        })
        .json<ChildrenResponse>();

      return json;
    },
  });

export const useCheckin = (childId: string) =>
  useMutation({
    mutationFn: async () => {
      const json = await ky
        .post(`https://app.famly.co/api/v2/children/${childId}/checkins`, {
          json: {
            accessToken: import.meta.env.VITE_API_KEY,
            pickupTime: "16:00",
          },
        })
        .json();

      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });

export const useCheckout = (childId: string) =>
  useMutation({
    mutationFn: async () => {
      const json = await ky
        .post(`https://app.famly.co/api/v2/children/${childId}/checkout`, {
          json: {
            accessToken: import.meta.env.VITE_API_KEY,
          },
        })
        .json();

      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });
