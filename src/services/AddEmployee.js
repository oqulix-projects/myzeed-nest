import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { firebaseConfig } from '../../firebaseConfig';

// ✅ Reuse or create secondary app safely
const secondaryApp = getApps().find(app => app.name === 'Secondary') || initializeApp(firebaseConfig, 'Secondary');
const secondaryAuth = getAuth(secondaryApp);

export const addNewEmployee = async (empData, loggedInUserId, companyName) => {
  try {
    const empId = uuidv4();

    // ✅ Create employee with secondaryAuth
    const userCred = await createUserWithEmailAndPassword(
      secondaryAuth,
      empData.empEmail,
      empData.empPassword
    );

    const uid = userCred.user.uid;
    // ✅ Save to Firestore
    const employeeRef = doc(db, 'userData', loggedInUserId, 'employees', empId);
    await setDoc(employeeRef, {
      uid,
      empName: empData.empName,
      empDepartment: empData.empDepartment,
      empPosition: empData.empPosition,
      empSuperVisor: empData.empSuperVisor,
      empEmail: empData.empEmail,
      companyName: companyName,
      companyId: loggedInUserId,
      createdAt: new Date()
    });
    const employeeRefMain = doc(db, 'allEmployees', uid);
    try {
  await setDoc(employeeRefMain, {
    uid,
    empName: empData.empName,
    companyName,
    companyId: loggedInUserId,
  });
} catch (e) {
  console.error("Failed to write to /employees:", e.message);
}

    // ✅ Sign out the secondary app only
    await signOut(secondaryAuth);

    alert('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error.message);
    alert('Failed to add employee: ' + error.message);
  }
};
