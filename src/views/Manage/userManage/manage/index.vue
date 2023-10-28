<script setup lang="ts">
import { getUser, searchUser, editUser } from "@/api/userManage/manage"
onMounted(async() => {
  loading.value = true
  await getList()
  setTimeout(() => {
    loading.value = false
  }, 500);
});
const loading = ref(true)
const getList = async () => {
  const data: any = await getUser(currentPage.value, pageSize.value);
  if (data?.result_code === "success") {
    tableData.splice(0, tableData.length, ...data.data.resultList);
    allPage.value = data.data.total;
  }
}

const userSearch = ref("");
type Options = {
  id: number,
  username: string
}
const options: Options[] = reactive([
  {
    id: 1,
    username: "2018+"
  },
  {
    id: 2,
    username: "2019"
  },
  {
    id: 3,
    username: "2020"
  },
  {
    id: 4,
    username: "2021"
  },
  {
    id: 5,
    username: "2022"
  },
  {
    id: 6,
    username: "2023"
  }
]);
const selectValue = ref("");
const search = async () => {
  const data: any = await searchUser(currentPage.value, pageSize.value, { keyword: userSearch.value, grade: selectValue.value })
  if (data?.result_code === "success") {
    tableData.splice(0, tableData.length, ...data.data.resultList);
    allPage.value = data.data.total;
  }
}

type userData = {
  createBy: string;
  createTime: string;
  email: null | string;
  grade: string;
  id: number;
  isDeleted: number;
  mobile: string;
  name: string;
  updateBy: string;
  updateTime: string;
  userId: string;
  version: number;
}
const tableData: Array<userData> = reactive([]);

const dialog = ref(false);
const editUserDialogForm = reactive({
  name: "",
  grade: "",
  email: "",
  mobile: "",
  userId: ""
});

const editId = ref(0);
const userEdit = async () => {
  const data = await editUser(editId.value, editUserDialogForm);
  if (data?.result_code === 'success') {
    search()
    dialog.value = false;
  }
}

const allPage = ref(0);
const currentPage = ref(1);
const pageSize = ref(15);
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  search();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  search();
};
</script>
<template>
  <div class="card">
    <div class="table-top">
      <div class="table-top-left">
        <el-input v-model="userSearch" style="margin-right: 1.5%" size="large" placeholder="搜索姓名" @change="() => {
          currentPage = 1;
          pageSize = 15;
          search()
        }">
          <template #prefix>
            <svg-icon iconName="icon-sousuo" className="svg" color="#757575"></svg-icon>
          </template>
        </el-input>
        <el-select v-model="selectValue" style="width: 38%" placeholder="选择年级" size="large" @change="() => {
          currentPage = 1;
          pageSize = 15;
          search()
        }">
          <el-option v-for="item in options" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </div>
    </div>
    <div class="table-main">
      <el-table v-loading="loading" :data="tableData" height="100%" style="width: 100%" border
        :header-cell-style="{ 'background-color': '#EDF1F7', color: 'black' }" stripe>
        <el-table-column prop="id" label="ID" width="50" align="center" />
        <el-table-column prop="name" label="姓名" width="100" align="center" />
        <el-table-column prop="grade" label="年级" width="100" align="center" />
        <el-table-column prop="mobile" label="手机号" width="200" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="userId" label="飞书ID" width="150" align="center" />
        <el-table-column prop="createBy" label="创建人" width="120" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="180" align="center" />
        <el-table-column fixed="right" label="操作项" width="150" align="center">
          <template #default="scope">
            <el-button color="#4460EF" plain link type="primary" style="font-weight: 600" @click.prevent="() => {
              dialog = true;
              editId = tableData[scope.$index].id;
              const { name, grade, mobile, userId, email } = tableData[scope.$index];
              Object.assign(editUserDialogForm, { name, grade, mobile, userId, email })
            }
              ">
              <span style="font-weight: 600">编辑</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-bottom">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[15, 25, 50]"
        :background="true" layout="total, sizes, prev, pager, next, jumper" :total="allPage"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
  <el-dialog v-model="dialog" width="35%" align-center>
    <el-form :model="editUserDialogForm" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="editUserDialogForm.name" style="width: 90%" placeholder="输入姓名（选填）" />
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="editUserDialogForm.grade" style="width: 90%" placeholder="输入年级（选填）" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="editUserDialogForm.mobile" style="width: 90%" placeholder="输入手机号（选填）" />
      </el-form-item>
      <el-form-item label="飞书ID">
        <el-input v-model="editUserDialogForm.userId" style="width: 90%" placeholder="输入飞书ID（选填）" disabled />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="editUserDialogForm.email" style="width: 90%" placeholder="输入邮箱（选填）" />
      </el-form-item>
      <div class="dialog-footer">
        <el-button @click="dialog = false" class="button">取消</el-button>
        <el-button type="primary" @click="userEdit" class="button" color="#4460EF">
          修改
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<style lang="scss" scoped>
.table-top {
  width: 100%;
  height: 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .table-top-left {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;

    .el-input {
      width: 38%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    ::v-deep(.el-input__wrapper) {
      height: 3em;
    }
  }
}

.table-main {
  margin-top: 0.7%;
  width: 100%;
  height: 86%;

  .el-table {
    ::v-deep(.cell) {
      font-size: 15px;
    }

    ::v-deep(.el-table__inner-wrapper) {
      border-radius: 10px 10px 0 0;
    }

    ::v-deep(.el-table__header-wrapper) {
      height: 11%;
      border-radius: 10px 10px 0 0;
    }

    ::v-deep(.el-table__header) {
      height: 100%;

      .cell {
        font-weight: 700;
      }
    }
  }
}

.table-bottom {
  width: 100%;
  height: 7%;
  padding-right: 1%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ::v-deep(.el-pagination.is-background .el-pager li.is-active) {
    background-color: #4460ef;
  }
}

::v-deep(.el-form-item__label) {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
}

.button {
  width: 12%;
  height: 40px;
  font-size: 16px;
  font-weight: 600;
}

.dialog-footer {
  width: 100%;
  padding: 0 3%;
  display: flex;
  justify-content: flex-end;
}
</style>
