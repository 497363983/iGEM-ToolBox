<template>
  <el-container direction="vertical">
    <el-row>
      <el-col :span="12">
        <el-form
          :disabled="loginLoading"
          ref="loginForm"
          label-width="100px"
          show-message
          :model="useUserStore()"
        >
          <h1 style="text-align: center; margin: 50px 0">iGEM Account</h1>
          <el-form-item
            label="Username"
            prop="username"
            :rules="[
              {
                required: true,
                message: 'Please input username',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="useUserStore().username"
              placeholder="Please enter username"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Password"
            prop="password"
            :rules="[
              {
                required: true,
                message: 'Please input password',
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              v-model="useUserStore().password"
              placeholder="Please enter password"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Email"
            prop="email"
            :rules="[
              {
                required: true,
                message: 'Please input email address',
                trigger: 'blur',
              },
              {
                type: 'email',
                trigger: ['blur', 'change'],
                message: 'Please input correct email address',
              },
            ]"
          >
            <el-input
              v-model="useUserStore().email"
              placeholder="Please enter email"
              type="email"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="Team ID">
          <el-input
            v-model="useCompetitionStore().teamID"
            placeholder="Please enter team ID"
          ></el-input>
        </el-form-item> -->
          <el-space fill>
            <el-alert type="info" show-icon :closable="false">
              <p>
                The iGEM account will be stored on your local storage, and will
                only be used to push code to
                <Link href="https://gitlab.igem.org/">GitLab</Link>
                and upload assets to
                <Link href="https://uploads.igem.org">uploads.igem.org</Link>
              </p>
            </el-alert>
          </el-space>
          <el-form-item>
            <el-button
              :loading="loginLoading"
              style="margin: 50px 0"
              @click="verify(loginForm)"
              type="primary"
              >Verify</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <svgIcon
          style="
            font-size: 15rem;
            left: 50%;
            top: 50%;
            position: relative;
            transform: translate(-50%, -50%);
          "
          iconClass="igem_toolbox"
        ></svgIcon>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup>
import { useUserStore } from "@/store";
import { checkCookie } from "@/utils/useIPC";
import { ref } from "vue";
import { ElMessage } from "element-plus";
const loginForm = ref();
const loginLoading = ref(false);

function verify(formRef) {
  if (!formRef) return;
  loginLoading.value = true;
  formRef.validate((valid) => {
    if (valid) {
      checkCookie(useUserStore().username, useUserStore().password, (res) => {
        if (res) {
          useUserStore().isTrue = false;
          ElMessage({
            message: "Verify iGEM account successful",
            type: "success",
          });
        } else {
          ElMessage({
            message: "The username or password may be incorrect",
            type: "error",
          });
        }
        loginLoading.value = false;
      });
    }
  });
}
</script>
