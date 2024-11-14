"use server";
export async function newVerification(token: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/verification/verify?token=${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json();

    return { success: "Email verified!" };
  } catch (error: any) {
    return { error: error.message };
  }
}
