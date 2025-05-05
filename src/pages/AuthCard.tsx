import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AuthCard = () => {
  const nav = useNavigate();
  useEffect(() => {
    nav("/home", { replace: true });
  }, []);
  return null;
};

export default AuthCard;
