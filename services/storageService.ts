import { RegistrationData } from "../types";
import { GOOGLE_SCRIPT_URL } from "../constants";

export const saveRegistration = async (data: RegistrationData): Promise<boolean> => {
  try {
    const payload = {
      ...data,
      action: 'create' // Explicit action as required
    };

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error("Submission error:", error);
    return false;
  }
};

export const getRegistrations = async (): Promise<RegistrationData[]> => {
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=readAll&t=${timestamp}`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    return data as RegistrationData[];
  } catch (error) {
    console.warn("Could not fetch from Sheets.", error);
    return [];
  }
};

export const deleteRegistration = async (id: string): Promise<boolean> => {
  try {
     await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id }),
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const clearRegistrations = async (): Promise<boolean> => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear' }),
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// --- Export Utilities ---

export const copyForGoogleSheets = (data: RegistrationData[]): boolean => {
  try {
    const headers = [
      "ID", "Timestamp", "Team Name", "Game", "Leader", "Phone", "Email", 
      "Player 1", "Player 2", "Player 3", "Player 4", 
      "Discord", "Ingame ID", "Payment", "Trx ID", "Agreed"
    ].join("\t");

    const rows = data.map(d => [
      d.id || '',
      d.timestamp || '',
      d.teamName,
      d.gameName,
      d.leaderName,
      d.leaderPhone,
      d.leaderEmail || '',
      d.player1,
      d.player2,
      d.player3,
      d.player4,
      d.discordUsername || '',
      d.ingameId || '',
      d.paymentMethod,
      d.transactionId,
      d.agreedToRules
    ].join("\t")).join("\n");

    navigator.clipboard.writeText(headers + "\n" + rows);
    return true;
  } catch (e) {
    console.error("Copy failed", e);
    return false;
  }
};

export const exportToCSV = (data: RegistrationData[]) => {
  const headers = [
    "ID", "Timestamp", "Team Name", "Game", "Leader", "Phone", "Email", 
    "Player 1", "Player 2", "Player 3", "Player 4", 
    "Discord", "Ingame ID", "Payment", "Trx ID", "Agreed"
  ];

  const csvRows = [
    headers.join(","),
    ...data.map(d => [
      d.id || '',
      d.timestamp || '',
      `"${d.teamName.replace(/"/g, '""')}"`,
      d.gameName,
      `"${d.leaderName.replace(/"/g, '""')}"`,
      d.leaderPhone,
      d.leaderEmail || '',
      `"${d.player1.replace(/"/g, '""')}"`,
      `"${d.player2.replace(/"/g, '""')}"`,
      `"${d.player3.replace(/"/g, '""')}"`,
      `"${d.player4.replace(/"/g, '""')}"`,
      d.discordUsername || '',
      d.ingameId || '',
      d.paymentMethod,
      d.transactionId,
      d.agreedToRules
    ].join(","))
  ];

  const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "thalta_registrations.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};