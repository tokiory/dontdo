import type { AppDispatch } from "@/app/store.ts";
import { useDispatch } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
