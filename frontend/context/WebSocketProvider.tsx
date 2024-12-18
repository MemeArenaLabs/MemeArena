"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import {
  FindOpponentDto,
  ProposeSkillDto,
  ProposeTeamDto,
} from "@/types/serverDTOs";

const RECONNECT_INTERVAL = 3000;
const RECONNECT_ATTEMPTS = Infinity;
const WS_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "";

interface WebSocketContextType {
  isConnected: boolean;
  lastMessage: any;
  sendMessage: (event: string, data: any) => void;
  findOpponent: (dto: FindOpponentDto) => void;
  proposeTeam: (dto: ProposeTeamDto) => void;
  proposeSkill: (dto: ProposeSkillDto) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const attemptRef = useRef(0);

  const connect = useCallback(() => {
    wsRef.current = new WebSocket(WS_URL);

    wsRef.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      attemptRef.current = 0;
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
      attemptReconnect();
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received message:", data);
      setLastMessage(data);
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, []);

  const attemptReconnect = useCallback(() => {
    if (attemptRef.current < RECONNECT_ATTEMPTS) {
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log(
          `Attempting to reconnect... (Attempt ${attemptRef.current + 1})`
        );
        attemptRef.current += 1;
        connect();
      }, RECONNECT_INTERVAL);
    }
  }, [connect]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback((event: string, data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ event, data }));
    } else {
      console.error("WebSocket is not connected");
    }
  }, []);

  const findOpponent = useCallback(
    (dto: FindOpponentDto) => {
      sendMessage("FINDING", dto);
    },
    [sendMessage]
  );

  const proposeTeam = useCallback(
    (dto: ProposeTeamDto) => {
      sendMessage("PROPOSE_TEAM", dto);
    },
    [sendMessage]
  );

  const proposeSkill = useCallback(
    (dto: ProposeSkillDto) => {
      sendMessage("PROPOSE_SKILL", dto);
    },
    [sendMessage]
  );

  const value = {
    isConnected,
    lastMessage,
    sendMessage,
    findOpponent,
    proposeTeam,
    proposeSkill,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
