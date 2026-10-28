module.exports = [
"[project]/src/components/porsesh/wizard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Wizard",
    ()=>Wizard,
    "computeProgress",
    ()=>computeProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/questions.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$web$2d$services$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/web-services.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/national-id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$section$2d$guide$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/porsesh/section-guide.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$charter$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/porsesh/charter-modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$fields$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/porsesh/fields.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$member$2d$matrix$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/porsesh/member-matrix.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$editors$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/porsesh/editors.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$flags$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/porsesh/flags.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/porsesh/dashboard.tsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$web$2d$services$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/porsesh/web-services.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mpi/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CircleCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$siren$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Siren$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/siren.js [app-ssr] (ecmascript) <export default as Siren>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-ssr] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/landmark.js [app-ssr] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fingerprint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fingerprint$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/fingerprint.js [app-ssr] (ecmascript) <export default as Fingerprint>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart-pulse.js [app-ssr] (ecmascript) <export default as HeartPulse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpenCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open-check.js [app-ssr] (ecmascript) <export default as BookOpenCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-ssr] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-ssr] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$badge$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileBadge2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-badge-2.js [app-ssr] (ecmascript) <export default as FileBadge2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.js [app-ssr] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$handshake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Handshake$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/handshake.js [app-ssr] (ecmascript) <export default as Handshake>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function computeProgress(assessment) {
    const provider = assessment.members.find((m)=>m.isMainProvider);
    let applicable = 0;
    let answered = 0;
    const dims = {};
    const bump = (d, ok)=>{
        if (!d) return;
        const cur = dims[d] ?? {
            pct: 0,
            answered: 0,
            applicable: 0
        };
        cur.applicable += 1;
        if (ok) cur.answered += 1;
        cur.pct = cur.answered / cur.applicable;
        dims[d] = cur;
    };
    for (const g of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTION_GROUPS"]){
        const list = g.loop ? g.memberFilter === "schoolAge" ? assessment.members.filter((m)=>m.schoolAge || typeof m.age === "number" && m.age >= 6 && m.age <= 18) : g.memberFilter === "provider" ? provider ? [
            provider
        ] : [] : assessment.members : [
            null
        ];
        const qs = g.questions.filter((qq)=>[
                "single",
                "multi",
                "boolean",
                "number"
            ].includes(qq.type));
        for (const m of list){
            for (const qq of qs){
                applicable += 1;
                const key = m ? `${qq.id}#${m.id}` : qq.id;
                const v = assessment.answers[key];
                const has = v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0);
                if (has) answered += 1;
                bump(qq.dimension, has);
            }
        }
    }
    return {
        applicable,
        answered,
        pct: applicable ? answered / applicable : 0,
        dims
    };
}
function DimensionChips({ dims }) {
    const D = [
        {
            id: "A",
            label: "سلامت"
        },
        {
            id: "B",
            label: "آموزش"
        },
        {
            id: "C",
            label: "مسکن"
        },
        {
            id: "D",
            label: "معیشت"
        },
        {
            id: "E",
            label: "مراقبت"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-1.5",
        children: D.map((d)=>{
            const st = dims[d.id];
            const p = st ? Math.round(st.pct * 100) : 0;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                title: `تکمیل بُعد ${d.label}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(p)}٪`,
                className: "inline-flex items-center gap-1.5 rounded-full border bg-card px-2 py-0.5 text-[10px] whitespace-nowrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        className: "text-teal-strong",
                        children: d.id
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 94,
                        columnNumber: 13
                    }, this),
                    " ",
                    d.label,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block w-8 h-1 rounded-full bg-muted overflow-hidden align-middle",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "block h-full bg-teal-strong rounded-full transition-all",
                            style: {
                                width: `${p}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 96,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 95,
                        columnNumber: 13
                    }, this),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(p),
                    "٪"
                ]
            }, d.id, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 93,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
function Wizard({ assessment }) {
    const step = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.wizardStep);
    const setStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.setWizardStep);
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.mode);
    const stepDef = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STEPS"][step - 1];
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>computeProgress(assessment), [
        assessment
    ]);
    /* گیت کد ملی — کلید شناسایی خانوار اجباری است: بدون کد ملی معتبر نمی‌توان از گام ۱ گذشت */ const nidValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidIranianNationalId"])(assessment.household.headNationalId ?? "");
    const nidGateBlocked = step === 1 && !nidValid;
    const guardLeaveStep1 = (target)=>{
        if (nidGateBlocked && target !== 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                title: "کد ملی اجباری است",
                description: "کد ملی سرپرست کلید شناسایی خانوار و مبنای استعلام همه مراجع است — برای ادامه، کد ملی معتبر (۱۰ رقم با تطبیق الگوریتم ثبت احوال) وارد کنید.",
                variant: "destructive"
            });
            return;
        }
        setStep(target);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-6xl px-4 py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-30 -mx-4 px-4 py-2.5 bg-background/95 backdrop-blur border-b no-print",
                role: "status",
                "aria-label": "پیشرفت تکمیل پرسشنامه",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-semibold whitespace-nowrap",
                                children: [
                                    "گام ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(step),
                                    " از ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(10),
                                    " — ",
                                    stepDef.short
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground whitespace-nowrap",
                                children: [
                                    "تکمیل پاسخ‌های سنجش: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-teal-strong",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faPct"])(progress.pct)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 137,
                                        columnNumber: 34
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px]",
                                        children: [
                                            " (",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(progress.answered),
                                            " از ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(progress.applicable),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ms-auto hidden md:block",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DimensionChips, {
                                    dims: progress.dims
                                }, void 0, false, {
                                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 rounded-full bg-muted overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full bg-gradient-to-l from-teal-strong to-emerald-400 transition-all duration-500",
                            style: {
                                width: `${Math.round(progress.pct * 100)}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 mb-4 overflow-x-auto thin-scroll",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                    className: "flex gap-1.5 min-w-max",
                    "aria-label": "مراحل پرسشنامه",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STEPS"].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>guardLeaveStep1(s.index),
                                "aria-current": s.index === step ? "step" : undefined,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition-colors min-h-9", s.index === step ? "bg-primary text-primary-foreground border-primary font-semibold" : "bg-card hover:border-ring/60"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("grid place-items-center size-5 rounded-full text-[10px]", s.index === step ? "bg-white/20" : "bg-muted"),
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(s.index)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 162,
                                        columnNumber: 17
                                    }, this),
                                    s.short
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this)
                        }, s.key, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 153,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 flex flex-wrap items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "grid place-items-center size-8 rounded-lg bg-teal-soft text-teal-strong text-sm font-bold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(stepDef.index)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this),
                                    stepDef.title
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground mt-1 leading-6 max-w-3xl",
                                children: stepDef.desc
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$section$2d$guide$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SectionGuideDialog"], {
                        stepKey: stepDef.key
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StepBody, {
                step: step,
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-0 mt-6 -mx-4 px-4 py-3 bg-background/95 backdrop-blur border-t flex items-center gap-2 z-20 no-print",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: ()=>setStep(Math.max(1, step - 1)),
                        disabled: step === 1,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "size-4",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            " قبلی"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground ms-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                className: "size-3.5",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            " پاسخ‌ها به‌صورت خودکار ذخیره می‌شوند (پیش‌نویس)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ms-auto flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$flags$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlagsDialog"], {
                                assessment: assessment,
                                trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    className: "border-destructive/40 text-destructive hover:bg-red-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$siren$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Siren$3e$__["Siren"], {
                                            className: "size-4",
                                            "aria-hidden": true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 197,
                                            columnNumber: 15
                                        }, void 0),
                                        " فوریت"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, void 0)
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this),
                            step < 10 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: ()=>guardLeaveStep1(step + 1),
                                disabled: nidGateBlocked,
                                children: [
                                    "بعدی ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                        className: "size-4",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 202,
                                        columnNumber: 20
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FinishButton, {
                                assessment: assessment
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            nidGateBlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-destructive mt-1.5 no-print",
                role: "alert",
                children: "ادامه پرسشنامه بدون کد ملی معتبر سرپرست ممکن نیست — کد ملی کلید شناسایی خانوار و مبنای استعلام همه مراجع است."
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 210,
                columnNumber: 9
            }, this),
            mode === "pro" && step >= 4 && step <= 8 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground mt-2",
                children: "نمای حرفه‌ای: مبانی محاسبه در گام ۱۰ و در داشبورد قابل مشاهده است."
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
function FinishButton({ assessment }) {
    const setStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.setStatus);
    const setView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.setView);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return done ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        variant: "outline",
        className: "border-teal-strong text-teal-strong",
        onClick: ()=>setView("assessments"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                className: "size-4",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            " ثبت شد — مشاهده پرونده‌ها"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 226,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
        onClick: ()=>{
            setStatus(assessment.id, "submitted");
            setDone(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                title: "پرسشنامه ثبت شد",
                description: "خلاصه غربالگری برای بازبینی انسانی آماده است. ثبت پرسشنامه شرط رسیدگی فوری نیست."
            });
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__["CircleCheck"], {
                className: "size-4",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 235,
                columnNumber: 7
            }, this),
            " ثبت نهایی پرسشنامه"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
/* ---------------- بدنه هر گام ---------------- */ function StepBody({ step, assessment }) {
    switch(step){
        case 1:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(IdentityStep, {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 244,
                columnNumber: 20
            }, this);
        case 2:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UrgencyStep, {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 245,
                columnNumber: 20
            }, this);
        case 3:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BaseStep, {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 246,
                columnNumber: 20
            }, this);
        case 4:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoredStep, {
                stepKey: "health",
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 247,
                columnNumber: 20
            }, this);
        case 5:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoredStep, {
                stepKey: "education",
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 248,
                columnNumber: 20
            }, this);
        case 6:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoredStep, {
                stepKey: "housing",
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 249,
                columnNumber: 20
            }, this);
        case 7:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoredStep, {
                stepKey: "livelihood",
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 250,
                columnNumber: 20
            }, this);
        case 8:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoredStep, {
                stepKey: "care",
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 251,
                columnNumber: 20
            }, this);
        case 9:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(QualityStep, {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 252,
                columnNumber: 20
            }, this);
        case 10:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryStep, {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 253,
                columnNumber: 21
            }, this);
    }
}
/* ---------------- ابزار گام هویت ---------------- */ function delay(ms) {
    return new Promise((res)=>setTimeout(res, ms));
}
/** نمایش کارت داده واکشی‌شده ملاک (قفل) */ function FetchedCard({ title, icon: Icon, res }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-teal-strong/30 bg-teal-soft/30 p-4 space-y-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "grid place-items-center size-8 rounded-lg bg-teal-soft text-teal-strong",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            className: "size-4.5",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 266,
                            columnNumber: 99
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-semibold",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        className: "ms-auto gap-1 bg-teal-strong text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                className: "size-3",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 268,
                                columnNumber: 68
                            }, this),
                            " ملاک ثبتی"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "rounded-xl border bg-background/70 p-3 space-y-1.5 text-xs",
                children: Object.entries(res.data).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-x-2 leading-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "text-muted-foreground",
                                children: [
                                    k,
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "font-medium flex items-center gap-1",
                                children: [
                                    v,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "inline size-3 text-muted-foreground",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 274,
                                        columnNumber: 68
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this)
                        ]
                    }, k, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 272,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] text-muted-foreground leading-5",
                children: [
                    "دریافت شد در ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDateTime"])(res.fetchedAt),
                    " — اصلاح فقط از مسیر درخواست به مرجع ثبتی."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 264,
        columnNumber: 5
    }, this);
}
const OTHER_SERVICES = [
    {
        id: "shaparak_bank",
        name: "شاپرک / بانک‌ها",
        org: "شاپرک و بانک‌های عامل",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"],
        label: "راستی‌آزمایی معیشت با توافقنامه (D1/D2)"
    },
    {
        id: "insurance",
        name: "بیمه",
        org: "تأمین اجتماعی و صندوق‌ها",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"],
        label: "پوشش پایه اعضا (A5)"
    },
    {
        id: "property",
        name: "اموال و املاک",
        org: "سازمان اموال و املاک",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
        label: "سابقه سند مسکن (C3)"
    },
    {
        id: "education_school",
        name: "آموزش‌وپرورش",
        org: "وزارت آموزش‌وپرورش",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpenCheck$3e$__["BookOpenCheck"],
        label: "ثبت‌نام اعضای در سن آموزش (B1/B2)"
    },
    {
        id: "higher_edu",
        name: "علوم / دانشگاه آزاد",
        org: "وزارت علوم",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"],
        label: "مدارک دانشگاهی (B3/B7)"
    }
];
/* گام ۱ — هویت، محرمانگی و واکشی از مراجع ثبتی */ function IdentityStep({ assessment }) {
    const updateHousehold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.updateHousehold);
    const updateMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.updateMember);
    const addMember = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.addMember);
    const setAnswersBulk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.setAnswersBulk);
    const setWebService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.setWebService);
    const clearWebService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.clearWebService);
    const allAssessments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.assessments);
    const h = assessment.household;
    const ws = assessment.webServices ?? {};
    const civil = ws.civil_registry;
    const post = ws.post;
    const fetched = civil?.status === "ok" || post?.status === "ok";
    const [nid, setNid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(h.headNationalId ?? "");
    const [birth, setBirth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(h.headBirthDate ?? "");
    const [postal, setPostal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(h.postalCode ?? "");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingFetch, setPendingFetch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const nidOk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidIranianNationalId"])(nid);
    const nidErr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nationalIdError"])(nid);
    const postalOk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidPostalCode"])(postal);
    const saveInputs = (patch)=>{
        updateHousehold(assessment.id, {
            headNationalId: nid.trim(),
            headBirthDate: birth.trim(),
            postalCode: postal.trim(),
            headNationalIdStatus: nid.trim() ? "has" : "missing",
            ...patch
        });
    };
    /** نتیجه استعلام روی نسخه تازه ارزیابی با شناسه‌های فعلی اجرا می‌شود (بدون بستگی به prop کهنه) */ const freshAssessment = ()=>({
            ...assessment,
            household: {
                ...h,
                headNationalId: nid.trim(),
                headBirthDate: birth.trim(),
                postalCode: postal.trim()
            }
        });
    const fetchIdentity = async ()=>{
        saveInputs();
        /* کد ملی کلید شناسایی است — بدون کد ملی معتبر واکشی ممنوع */ if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidIranianNationalId"])(nid)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                title: "کد ملی معتبر وارد نشده است",
                description: "کد ملی سرپرست اجباری و کلید استعلام همه مراجع است؛ با تطبیق الگوریتم ثبت احوال بررسی و دوباره تلاش کنید.",
                variant: "destructive"
            });
            return;
        }
        /* هشدار پرونده تکراری — کد ملی مبنای شناسایی است؛ ثبت هم‌کدملی باید آگاهانه باشد */ const nidNorm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeDigits"])(nid);
        const dups = Object.values(allAssessments).filter((x)=>x.id !== assessment.id && !x.demo && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$national$2d$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeDigits"])(x.household.headNationalId ?? "") === nidNorm);
        if (dups.length > 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                title: `پرونده دیگری با همین کد ملی وجود دارد (${new Intl.NumberFormat("fa-IR").format(dups.length)} پرونده)`,
                description: "اگر ادامه همان پرونده است، از «بانک پرونده‌ها» بازش کنید؛ ثبت جدید با کد ملی مشترک فقط به‌عنوان بررسی جدید و با آگاهی از تکرار درج می‌شود.",
                variant: "destructive"
            });
        }
        setPendingFetch(true);
        try {
            const fa = freshAssessment();
            setBusy("استعلام هویت و اعضای خانوار از ثبت احوال ...");
            await delay(1100);
            const r1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$web$2d$services$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulateServiceFetch"])("civil_registry", fa);
            setWebService(assessment.id, "civil_registry", r1);
            if (r1.prefills?.householdPatch) updateHousehold(assessment.id, r1.prefills.householdPatch);
            setBusy("استعلام نشانی و موقعیت جغرافیایی از پست (از کد پستی) ...");
            await delay(950);
            const r2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$web$2d$services$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulateServiceFetch"])("post", fa);
            setWebService(assessment.id, "post", r2);
            if (r2.prefills?.householdPatch) updateHousehold(assessment.id, r2.prefills.householdPatch);
            if (r1.status === "ok" && r2.status === "ok") {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                    title: "واکشی هویتی انجام شد",
                    description: "نام سرپرست، اعضای سابقه ثبتی و نشانی از ثبت احوال و پست دریافت و ملاک شد."
                });
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                    title: "واکشی با نقص انجام شد",
                    description: r1.note ?? r2.note ?? "برخی داده‌ها دریافت نشد — مسیر دستی فعال است.",
                    variant: "destructive"
                });
            }
        } finally{
            setBusy(null);
            setPendingFetch(false);
        }
    };
    /** پیش‌تکمیل با تأیید کاربر — با حفظ منبع و تاریخ؛ تأیید خودکار شرایط جاری نیست */ const applyPrefills = (r)=>{
        if (r.prefills?.householdPatch) updateHousehold(assessment.id, r.prefills.householdPatch);
        if (r.prefills?.answerPrefills?.length) {
            setAnswersBulk(assessment.id, Object.fromEntries(r.prefills.answerPrefills.map((p)=>[
                    p.key,
                    p.value
                ])));
        }
        if (r.prefills?.memberPrefills?.length) {
            for (const mp of r.prefills.memberPrefills)updateMember(assessment.id, mp.memberId, mp.patch);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
            title: "پیش‌تکمیل اعمال شد",
            description: "داده با حفظ منبع و تاریخ استعلام ثبت شد؛ شرایط جاری جداگانه بررسی می‌شود و تأیید خودکار نیست."
        });
    };
    void applyPrefills; /* نگهداری برای بازآزمایی دستی — اعمال پیش‌فرض اکنون خودکار است */ 
    const registryMembersAdded = assessment.members.some((m)=>m.fromRegistry);
    const registryCreates = civil?.prefills?.memberCreates ?? [];
    const addRegistryMembers = ()=>{
        for (const mc of registryCreates){
            addMember(assessment.id, {
                ...mc,
                isHead: false
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
            title: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(registryCreates.length)} عضو واکشی‌شده ثبت شد`,
            description: "با برچسب «واکشی از ثبت احوال» — ترکیب جاری خانوار را تأیید یا اصلاح کنید."
        });
    };
    const fetchOther = async (s)=>{
        saveInputs();
        setBusy(`استعلام از ${s.name} با کد ملی ...`);
        try {
            await delay(850);
            const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$web$2d$services$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["simulateServiceFetch"])(s.id, freshAssessment());
            setWebService(assessment.id, s.id, r);
            /* اعمال خودکار پیش‌تکمیل — سرویس متولی ملاک است؛ جایگاه و مقدار پرسش‌ها حفظ می‌شود و ثبت دستی لازم نیست */ let applied = 0;
            if (r.status !== "error" && r.prefills) {
                if (r.prefills.householdPatch && Object.keys(r.prefills.householdPatch).length > 0) {
                    updateHousehold(assessment.id, r.prefills.householdPatch);
                    applied += 1;
                }
                if (r.prefills.answerPrefills?.length) {
                    setAnswersBulk(assessment.id, Object.fromEntries(r.prefills.answerPrefills.map((p)=>[
                            p.key,
                            p.value
                        ])));
                    applied += r.prefills.answerPrefills.length;
                }
                if (r.prefills.memberPrefills?.length) {
                    for (const mp of r.prefills.memberPrefills)updateMember(assessment.id, mp.memberId, mp.patch);
                    applied += r.prefills.memberPrefills.length;
                }
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                title: r.status === "error" ? `استعلام ${s.name} ناموفق` : `استعلام ${s.name} انجام شد`,
                description: r.status === "error" ? r.note ?? "نتیجه‌ای دریافت نشد — مسیر دستی فعال است." : `${r.note ?? "نتیجه مرجع ثبت شد."}${applied > 0 ? ` ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(applied)} مقدار به‌صورت خودکار در پرسش‌های مرتبط ثبت و ملاک شد.` : ""}`,
                variant: r.status === "error" ? "destructive" : "default"
            });
        } finally{
            setBusy(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 max-w-4xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-card p-4.5 space-y-2.5 leading-7 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-base flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                className: "size-5 text-teal-strong",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 446,
                                columnNumber: 69
                            }, this),
                            " به پرسش‌نامه خانوار خوش آمدید"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 446,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "این پرسش‌نامه برای ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "سنجش عملیاتی محرومیت"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 448,
                                columnNumber: 30
                            }, this),
                            " خانوار طراحی شده است، نه رد یا پذیرش درخواست. پاسخ‌ها به ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "محرمانگی کامل"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 448,
                                columnNumber: 115
                            }, this),
                            " پردازش می‌شوند. اگر از فرم ثبت‌نام آمده‌اید، شناسه‌ها و داده هویتی به‌صورت خودکار واکشی شده است؛ در غیر این صورت سه شناسه زیر را وارد کنید تا واکشی انجام شود."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "list-disc ps-5 space-y-1 text-muted-foreground text-[13px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-foreground",
                                        children: "کد ملی سرپرست اجباری است"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 452,
                                        columnNumber: 15
                                    }, this),
                                    " — کلید شناسایی خانوار و مبنای استعلام همه مراجع (ثبت احوال، پست، شاپرک، تأمین اجتماعی، املاک، آموزش‌وپرورش، علوم). اگر سرپرست فاقد مدرک است، مسیر دریافت مدرک (R8) با همراهی مددکار فعال می‌شود."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 452,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    "نوع درخواست شما در ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "ثبت‌نام"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 453,
                                        columnNumber: 34
                                    }, this),
                                    " انتخاب شده است؛ در گام آخر به‌عنوان داده خدماتی قابل تکمیل و اصلاح است."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "شماره موبایل، رمز عبور (فقط هش) و توافقنامه بانکی نیز از ثبت‌نام منتقل شده‌اند."
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 454,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "اگر وضعیت فوری یا خطرناکی دارید، از دکمه «فوریت» در پایین صفحه استفاده کنید — نیازی به تکمیل بقیه فرم نیست."
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 455,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "کد پستی برای واکشی نشانی از پست است و برای بی‌خانمان‌ها اجباری نیست."
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 456,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: "در هر زمان می‌توانید پیش‌نویس را ذخیره و بعداً ادامه دهید."
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 451,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 445,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-teal-strong/30 bg-teal-soft/30 p-4.5 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fingerprint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fingerprint$3e$__["Fingerprint"], {
                                className: "size-5 text-teal-strong",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 463,
                                columnNumber: 63
                            }, this),
                            " شروع با واکشی — سه شناسه"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 463,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground leading-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "کد ملی کلید و مبنای شناسایی فرد است و اجباری:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 465,
                                columnNumber: 11
                            }, this),
                            " هویت و اعضای خانوار از ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "ثبت احوال"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 465,
                                columnNumber: 87
                            }, this),
                            " و نشانی و موقعیت جغرافیایی از ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "پست"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 465,
                                columnNumber: 134
                            }, this),
                            " (از کد پستی) واکشی می‌شود؛ سپس سایر مراجع متولی (بیمه، املاک، آموزش‌وپرورش، علوم) نیز با همان کد ملی استعلام می‌شوند. داده واکشی‌شده ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "ملاک"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 466,
                                columnNumber: 117
                            }, this),
                            " است و در فرم فقط‌خواندنی می‌شود."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 464,
                        columnNumber: 9
                    }, this),
                    fetched ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5",
                        children: [
                            {
                                label: "کد ملی سرپرست",
                                value: h.headNationalId
                            },
                            {
                                label: "موبایل سرپرست (از ثبت‌نام)",
                                value: h.headMobile
                            },
                            {
                                label: "تاریخ تولد سرپرست",
                                value: h.headBirthDate
                            },
                            {
                                label: "کد پستی",
                                value: h.postalCode
                            }
                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs",
                                        children: f.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 477,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border bg-muted/50 px-3 py-2.5 text-sm flex items-center gap-1.5",
                                        "aria-readonly": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                className: "size-3.5 text-muted-foreground shrink-0",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 479,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                dir: "ltr",
                                                className: "truncate",
                                                children: f.value || "—"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 480,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 478,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, f.label, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 476,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 469,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid sm:grid-cols-3 gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "id-nid",
                                                children: "کد ملی سرپرست (۱۰ رقم)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 489,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                className: "text-[10px] bg-red-100 text-destructive border border-destructive/30 hover:bg-red-100 gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fingerprint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fingerprint$3e$__["Fingerprint"], {
                                                        className: "size-3",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 19
                                                    }, this),
                                                    " اجباری — کلید شناسایی"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 490,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 488,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "id-nid",
                                        dir: "ltr",
                                        inputMode: "numeric",
                                        value: nid,
                                        onChange: (e)=>setNid(e.target.value),
                                        placeholder: "۱۰ رقم — بدون خط تیره",
                                        "aria-required": "true",
                                        "aria-invalid": !nidOk && nid.length > 0,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(nid.length > 0 && !nidOk && "border-destructive focus-visible:ring-destructive/30")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 494,
                                        columnNumber: 15
                                    }, this),
                                    nid.length > 0 && nidErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-destructive leading-4",
                                        role: "alert",
                                        children: nidErr
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 495,
                                        columnNumber: 44
                                    }, this),
                                    nidOk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-emerald-700 flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__["CircleCheck"], {
                                                className: "size-3.5",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 496,
                                                columnNumber: 93
                                            }, this),
                                            " کد ملی معتبر است — کلید استعلام مراجع آماده است."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 496,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 487,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "id-birth",
                                        children: "تاریخ تولد سرپرست"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 499,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "id-birth",
                                        dir: "ltr",
                                        value: birth,
                                        onChange: (e)=>setBirth(e.target.value),
                                        placeholder: "مثلاً ۱۳۶۲/۰۵/۱۲"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 500,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 498,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "id-postal",
                                        children: "کد پستی محل سکونت (۱۰ رقم)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 503,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                        id: "id-postal",
                                        dir: "ltr",
                                        inputMode: "numeric",
                                        value: postal,
                                        onChange: (e)=>setPostal(e.target.value),
                                        placeholder: "۱۰ رقم — برای واکشی نشانی"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 504,
                                        columnNumber: 15
                                    }, this),
                                    postal.length > 0 && !postalOk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-amber-700",
                                        children: "کد پستی باید ۱۰ رقم باشد؛ بی‌خانمان‌ها بدون کد پستی ثبت می‌شوند."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 505,
                                        columnNumber: 50
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 502,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 486,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2 items-center",
                        children: [
                            fetched ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: ()=>{
                                            clearWebService(assessment.id, "civil_registry");
                                            clearWebService(assessment.id, "post");
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                                                title: "نتیجه واکشی حذف شد",
                                                description: "می‌توانید شناسه‌ها را اصلاح و دوباره واکشی کنید."
                                            });
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                className: "size-4",
                                                "aria-hidden": true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 513,
                                                columnNumber: 17
                                            }, this),
                                            " اصلاح شناسه‌ها و واکشی مجدد"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 512,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: "داده هویتی و نشانی از مرجع ثبتی دریافت شده است."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 515,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: fetchIdentity,
                                disabled: pendingFetch || !nidOk,
                                title: !nidOk ? "برای واکشی، ابتدا کد ملی معتبر سرپرست را وارد کنید" : undefined,
                                children: [
                                    pendingFetch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "size-4 animate-spin",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 519,
                                        columnNumber: 31
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fingerprint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fingerprint$3e$__["Fingerprint"], {
                                        className: "size-4",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 519,
                                        columnNumber: 89
                                    }, this),
                                    "واکشی اطلاعات هویتی از ثبت احوال و پست"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 518,
                                columnNumber: 13
                            }, this),
                            !nidOk && !fetched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-muted-foreground",
                                children: "واکشی پس از ثبت کد ملی معتبر فعال می‌شود."
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 523,
                                columnNumber: 34
                            }, this),
                            busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-teal-strong flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "size-3.5 animate-spin",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 524,
                                        columnNumber: 89
                                    }, this),
                                    " ",
                                    busy
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 524,
                                columnNumber: 20
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 509,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            assessment.registrationKind && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-card p-4 flex flex-wrap items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "grid place-items-center size-9 rounded-xl bg-teal-soft text-teal-strong shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                            className: "size-5",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 531,
                            columnNumber: 110
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 531,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-56 flex-1 space-y-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold",
                                children: "وضعیت ثبت‌نام — منتقل‌شده از فرم ثبت‌نام"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground leading-5",
                                children: [
                                    "نوع درخواست: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        className: "text-foreground",
                                        children: assessment.registrationKind === "need_service" ? "اعلام نیازمندی و دریافت خدمات" : "متقاضی ارائه خدمت به مددجویان و نیازمندان"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 535,
                                        columnNumber: 28
                                    }, this),
                                    assessment.household.consents?.bankAccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            " • توافقنامه دسترسی به اطلاعات بانکی: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                className: "text-foreground",
                                                children: "پذیرفته شد"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 537,
                                                columnNumber: 57
                                            }, this),
                                            " ",
                                            assessment.household.consents.agreedAt ? `در ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDateTime"])(assessment.household.consents.agreedAt)}` : "",
                                            ws.shaparak_bank ? " — استعلام شاپرک اجرا شد" : " — استعلام شاپرک از پنل مراجع قابل اجراست"
                                        ]
                                    }, void 0, true),
                                    assessment.household.registeredAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            " • زمان ثبت‌نام: ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDateTime"])(assessment.household.registeredAt)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 534,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 532,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "outline",
                        className: "bg-teal-soft text-teal-strong border-teal-strong/30 gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$handshake$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Handshake$3e$__["Handshake"], {
                                className: "size-3.5",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 545,
                                columnNumber: 13
                            }, this),
                            " ثبت‌نام انجام شد"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 544,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 530,
                columnNumber: 9
            }, this),
            civil?.status === "ok" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FetchedCard, {
                title: "ثبت احوال — هویت سرپرست و سابقه اعضای خانوار",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fingerprint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fingerprint$3e$__["Fingerprint"],
                res: civil
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 551,
                columnNumber: 34
            }, this),
            civil && civil.status === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm rounded-xl border border-amber-200 bg-amber-50 p-3.5 leading-6",
                children: civil.note
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 553,
                columnNumber: 9
            }, this),
            post?.status === "ok" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FetchedCard, {
                title: "پست — نشانی استاندارد و موقعیت جغرافیایی",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
                res: post
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 555,
                columnNumber: 33
            }, this),
            post && post.status === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm rounded-xl border border-amber-200 bg-amber-50 p-3.5 leading-6",
                children: post.note
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 557,
                columnNumber: 9
            }, this),
            registryCreates.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-card p-4.5 flex flex-wrap items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "grid place-items-center size-9 rounded-xl bg-teal-soft text-teal-strong",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fingerprint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Fingerprint$3e$__["Fingerprint"], {
                            className: "size-5",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 563,
                            columnNumber: 101
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 563,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-56 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold",
                                children: [
                                    "اعضای واکشی‌شده از سابقه ثبتی — ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(registryCreates.length),
                                    " نفر"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 565,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground leading-5 mt-0.5",
                                children: [
                                    registryCreates.map((m)=>`${m.firstName.split(" ")[0]} (${m.relation})`).join("، "),
                                    " — با برچسب منبع ثبت می‌شوند و ترکیب جاری خانوار جداگانه تأیید می‌شود."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 566,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 564,
                        columnNumber: 11
                    }, this),
                    registryMembersAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "outline",
                        className: "bg-teal-soft text-teal-strong border-teal-strong/30 gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__["CircleCheck"], {
                                className: "size-3.5",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 571,
                                columnNumber: 108
                            }, this),
                            " ثبت شده‌اند"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 571,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: addRegistryMembers,
                        children: "ثبت اعضای واکشی‌شده"
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 573,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 562,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-card p-4.5 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"], {
                                className: "size-5 text-teal-strong",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 580,
                                columnNumber: 63
                            }, this),
                            " استعلام سایر مراجع متولی با کد ملی"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 580,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground leading-5",
                        children: [
                            "با استفاده از کد ملی سرپرست، تا حد امکان اطلاعات مرتبط با پرسشنامه از سایر سازمان‌ها استعلام می‌شود. نتیجه به‌صورت ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "«پیش‌تکمیل»"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 583,
                                columnNumber: 25
                            }, this),
                            " با حفظ منبع و تاریخ اعمال می‌شود — پیش‌تکمیل تأیید خودکار شرایط جاری نیست (قاعده مهاجرت داده)."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 581,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid sm:grid-cols-2 gap-3",
                        children: OTHER_SERVICES.map((s)=>{
                            const r = ws[s.id];
                            const prefillCount = (r?.prefills?.answerPrefills?.length ?? 0) + (r?.prefills?.memberPrefills?.length ?? 0) + (Object.keys(r?.prefills?.householdPatch ?? {}).length > 0 ? 1 : 0);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border p-3.5 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "grid place-items-center size-8 rounded-lg bg-teal-soft text-teal-strong",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(s.icon, {
                                                    className: "size-4",
                                                    "aria-hidden": true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                    lineNumber: 592,
                                                    columnNumber: 109
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 592,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-semibold leading-5",
                                                        children: s.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 594,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[11px] text-muted-foreground",
                                                        children: s.org
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 593,
                                                columnNumber: 19
                                            }, this),
                                            r?.status === "ok" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                className: "ms-auto bg-emerald-600 text-white gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__["CircleCheck"], {
                                                        className: "size-3",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 101
                                                    }, this),
                                                    " دریافت شد"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 597,
                                                columnNumber: 42
                                            }, this),
                                            r?.status === "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: "ms-auto text-destructive border-destructive/40",
                                                children: "ناموفق"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 598,
                                                columnNumber: 45
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 591,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[11px] text-muted-foreground",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 600,
                                        columnNumber: 17
                                    }, this),
                                    r && r.status !== "error" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                        className: "rounded-lg border bg-muted/30 p-2.5 space-y-1 text-[11px] leading-4",
                                        children: Object.entries(r.data).slice(0, 3).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-x-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                        className: "text-muted-foreground",
                                                        children: [
                                                            k,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 605,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                        className: "font-medium",
                                                        children: v
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 605,
                                                        columnNumber: 72
                                                    }, this)
                                                ]
                                            }, k, true, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 604,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 602,
                                        columnNumber: 19
                                    }, this),
                                    r?.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 leading-4",
                                        children: r.note
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 610,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1.5 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                onClick: ()=>fetchOther(s),
                                                disabled: !!busy || pendingFetch || !nidOk,
                                                title: !nidOk ? "کد ملی معتبر سرپرست کلید استعلام است" : undefined,
                                                children: [
                                                    busy?.startsWith(`استعلام از ${s.name}`) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "size-3.5 animate-spin",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 613,
                                                        columnNumber: 65
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                        className: "size-3.5",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 613,
                                                        columnNumber: 125
                                                    }, this),
                                                    r ? "استعلام مجدد" : "استعلام با کد ملی"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 612,
                                                columnNumber: 19
                                            }, this),
                                            r && r.status !== "error" && !!r.prefills && prefillCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: "bg-teal-soft text-teal-strong border-teal-strong/30 gap-1 text-[10px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheck$3e$__["CircleCheck"], {
                                                        className: "size-3",
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 618,
                                                        columnNumber: 23
                                                    }, this),
                                                    " اعمال خودکار در پرسشنامه (",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(prefillCount),
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 617,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 611,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, s.id, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 590,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 585,
                        columnNumber: 9
                    }, this),
                    !nidOk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-muted-foreground",
                        children: "استعلام سایر مراجع با کلید کد ملی انجام می‌شود — ابتدا کد ملی ده‌رقمی معتبر سرپرست را وارد و واکشی کنید."
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 626,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 579,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 443,
        columnNumber: 5
    }, this);
}
/* گام ۲ — فوریت */ function UrgencyStep({ assessment }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 max-w-3xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-red-200 bg-red-50/60 p-5 flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$siren$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Siren$3e$__["Siren"], {
                        className: "size-6 text-destructive shrink-0 mt-0.5",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 637,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm leading-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold",
                                children: "بررسی اولیه نشانه‌های فوریت"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 639,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: [
                                    "اگر خطر جانی، بی‌خانمانی، فقدان مراقب یا وضعیت اضطراری دیگری وجود دارد، همین حالا ثبت کنید.",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: " رسیدگی فوری مستقل از امتیاز و مستقل از تکمیل پرسشنامه است."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 642,
                                        columnNumber: 13
                                    }, this),
                                    " این گام در تمام مراحل از دکمه «فوریت» در پایین صفحه در دسترس است."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 640,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 638,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 636,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 flex-wrap",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$flags$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlagsDialog"], {
                    assessment: assessment,
                    trigger: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        className: "bg-destructive hover:bg-destructive/90 text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$siren$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Siren$3e$__["Siren"], {
                                className: "size-4",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 649,
                                columnNumber: 13
                            }, void 0),
                            " ثبت نشانه فوریت جدید"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 648,
                        columnNumber: 11
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                    lineNumber: 647,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 646,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$flags$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlagsList"], {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 653,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 635,
        columnNumber: 5
    }, this);
}
/* گام ۳ — اطلاعات پایه */ function BaseStep({ assessment }) {
    const updateHousehold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.updateHousehold);
    const h = assessment.household;
    const set = (patch)=>updateHousehold(assessment.id, patch);
    // قفل فیلدهای ملاک ثبتی: پس از استعلام موفق، مقدار مرجع غیرقابل ویرایش است
    const ws = assessment.webServices ?? {};
    const civilOk = ws.civil_registry?.status === "ok";
    const postAny = ws.post?.status === "ok" || ws.post?.status === "partial";
    const postFull = ws.post?.status === "ok";
    const field = (key, label, opts)=>{
        const val = h[key] ?? "";
        if (opts?.locked) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                        htmlFor: `hh-${String(key)}`,
                        className: "flex items-center gap-1.5",
                        children: [
                            label,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "text-[10px] gap-1 bg-teal-soft text-teal-strong border-teal-strong/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "size-3",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 678,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    opts.locked,
                                    " — ملاک، غیرقابل ویرایش"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 677,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 675,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border bg-muted/50 px-3 py-2.5 text-sm min-h-9 text-foreground/90",
                        "aria-readonly": true,
                        children: String(val || "—")
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 681,
                        columnNumber: 11
                    }, this)
                ]
            }, `hh-${String(key)}`, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 674,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1.5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                    htmlFor: `hh-${String(key)}`,
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                    lineNumber: 689,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                    id: `hh-${String(key)}`,
                    dir: opts?.dir,
                    type: opts?.type ?? "text",
                    value: val,
                    onChange: (e)=>set({
                            [key]: opts?.type === "number" ? e.target.value === "" ? undefined : Number(e.target.value) : e.target.value
                        }),
                    placeholder: opts?.placeholder
                }, void 0, false, {
                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                    lineNumber: 690,
                    columnNumber: 9
                }, this)
            ]
        }, `hh-${String(key)}`, true, {
            fileName: "[project]/src/components/porsesh/wizard.tsx",
            lineNumber: 688,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$web$2d$services$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WebServicePanel"], {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 704,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-1 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                className: "size-5 text-teal-strong",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 707,
                                columnNumber: 68
                            }, this),
                            " اطلاعات پایه و پرونده‌ای"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 707,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground mb-4 leading-5",
                        children: [
                            "این اطلاعات «شناخت خانوار» است و ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "بدون امتیاز مستقل"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 709,
                                columnNumber: 44
                            }, this),
                            "؛ فقط برای اجرای منطق نمایش و مراجعه. کد ملی، کد پستی و تاریخ تولد در گام ۱ ثبت و واکشی می‌شوند؛ سرپرست و فرد پاسخ‌گو دو نقش مستقل‌اند. برای جلوگیری از پرسش تکراری، نوع محل سکونت و حق سکونت در گام «مسکن» (C1/C3) و تعداد اتاق/زیربنا در شاخص C4 ثبت می‌شود."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 708,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid sm:grid-cols-2 gap-3",
                        children: [
                            field("responderName", "نام فرد پاسخ‌گو / مسئول پیگیری خانوار"),
                            field("responderRelation", "نسبت پاسخ‌گو با سرپرست", {
                                placeholder: "مثلاً خود سرپرست، همسر، فرزند ..."
                            }),
                            field("headName", "نام سرپرست خانوار", {
                                locked: civilOk ? "وب‌سرویس ثبت احوال" : undefined
                            }),
                            field("headNationalId", "کد ملی سرپرست", {
                                dir: "ltr",
                                locked: civilOk ? "وب‌سرویس ثبت احوال" : undefined
                            }),
                            field("headBirthDate", "تاریخ تولد سرپرست", {
                                dir: "ltr",
                                placeholder: "مثلاً ۱۳۶۲/۰۵/۱۲",
                                locked: civilOk ? "وب‌سرویس ثبت احوال" : undefined
                            }),
                            field("postalCode", "کد پستی (کلید واکشی نشانی از پست)", {
                                dir: "ltr",
                                locked: postAny ? "وب‌سرویس پست" : undefined
                            }),
                            field("contactPhone", "تلفن تماس خانوار", {
                                dir: "ltr"
                            }),
                            h.headMobile && field("headMobile", "موبایل سرپرست (از فرم ثبت‌نام)", {
                                dir: "ltr",
                                locked: "فرم ثبت‌نام"
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "hh-nidstatus",
                                        children: "وضعیت مدرک هویتی سرپرست"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 723,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                        value: h.headNationalIdStatus ?? "has",
                                        onValueChange: (v)=>set({
                                                headNationalIdStatus: v
                                            }),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                id: "hh-nidstatus",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 48
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 725,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "has",
                                                        children: "دارد"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 727,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "missing",
                                                        children: "فاقد مدرک / نیازمند بررسی"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 728,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "in_progress",
                                                        children: "در جریان دریافت"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                        lineNumber: 729,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 726,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 724,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-muted-foreground",
                                        children: "کد ملی سرپرست کلید پرونده و اجباری است؛ اگر مدرک ندارد، مسیر دریافت مدرک (R8) با مددکار پیگیری می‌شود."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 732,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 722,
                                columnNumber: 11
                            }, this),
                            field("province", "استان", {
                                locked: postAny ? "وب‌سرویس پست" : undefined
                            }),
                            field("county", "شهرستان", {
                                locked: postAny ? "وب‌سرویس پست" : undefined
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 713,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 space-y-2",
                        children: [
                            field("address", "نشانی قابل مراجعه (در صورت وجود)", {
                                placeholder: "برای فرد بی‌خانمان اجباری نیست",
                                locked: postFull ? "وب‌سرویس پست" : undefined
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2.5 text-sm cursor-pointer rounded-lg border bg-amber-50/50 border-amber-200 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                        checked: !!h.noFixedAddress,
                                        onCheckedChange: (c)=>set({
                                                noFixedAddress: !!c
                                            }),
                                        "aria-label": "فاقد نشانی ثابت"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 740,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "خانوار ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "فاقد نشانی ثابت"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 741,
                                                columnNumber: 26
                                            }, this),
                                            " است — مسیر بررسی میدانی فعال شود"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 741,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 739,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 737,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 706,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$editors$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MemberManager"], {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 746,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-card p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-1",
                        children: "هزینه‌های مسکن (داده‌های محاسبه C8)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 749,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground mb-3 leading-5",
                        children: "وديعة جدا از هزینه ماهانه ثبت می‌شود و در محاسبه فشار هزینه مسکن لحاظ نمی‌گردد. تعداد اتاق و زیربنا — که در تراکم (C4) امتیاز دارند — فقط در گام «مسکن» و شاخص C4 پرسیده می‌شوند و اینجا تکرار نمی‌شوند."
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 750,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid sm:grid-cols-3 gap-3",
                        children: [
                            field("monthlyRent", "اجاره ماهانه (تومان)", {
                                type: "number"
                            }),
                            field("deposit", "ودیعه (تومان) — جدا از اجاره", {
                                type: "number"
                            }),
                            field("monthlyCharge", "شارژ ماهانه (تومان)", {
                                type: "number"
                            }),
                            field("monthlyBills", "میانگین قبوض ماهانه (تومان)", {
                                type: "number"
                            }),
                            field("arrears", "مجموع معوقه (تومان)", {
                                type: "number"
                            }),
                            field("supportSince", "شروع دوره حمایت (اختیاری)", {
                                placeholder: "مثلاً ۱۴۰۲"
                            }),
                            field("priorServices", "خدمات/برنامه‌های حمایتی قبلی", {
                                placeholder: "مثلاً اکرام، تغذیه، شهریه ..."
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 754,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 748,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 703,
        columnNumber: 5
    }, this);
}
/* گام‌های ۴ تا ۸ — شاخص‌ها */ /** گروه‌های عضومحور که با «ماتریس انتساب اعضا» رندر می‌شوند — هر شاخص فقط یک‌بار پرسیده می‌شود (رفع پرسش تکراری) */ const MEMBER_MATRIX_KEYS = new Set([
    "A1",
    "A2",
    "A3",
    "A5",
    "A_nutrition",
    "B1",
    "B2",
    "B6"
]);
function ScoredStep({ stepKey, assessment }) {
    const groups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsOfStep"])(stepKey);
    const setAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.setAnswer);
    const provider = assessment.members.find((m)=>m.isMainProvider);
    const ws = assessment.webServices ?? {};
    const h = assessment.household;
    /** آیا پرسش با استعلام سرویس متولی پاسخ داده شده؟ → قفل ملاک */ const serviceLockFor = (q, answerKey)=>{
        if (!q.service) return undefined;
        const r = ws[q.service.id];
        if (!r || r.status === "error") return undefined;
        const prefill = r.prefills?.answerPrefills?.find((p)=>p.key === answerKey);
        if (!prefill) return undefined;
        return {
            org: q.service.org,
            at: r.fetchedAt
        };
    };
    const membersFor = (g)=>{
        if (!g.loop) return [];
        if (g.memberFilter === "schoolAge") {
            const rel = assessment.members.filter((m)=>m.schoolAge || typeof m.age === "number" && m.age >= 6 && m.age <= 18);
            return rel;
        }
        if (g.memberFilter === "provider") return provider ? [
            provider
        ] : [];
        return assessment.members;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            assessment.members.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6",
                children: "برای پاسخ به پرسش‌های این بخش، ابتدا در گام «اطلاعات پایه» اعضای خانوار را ثبت کنید."
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 803,
                columnNumber: 9
            }, this),
            groups.map((g)=>{
                /* گروه‌های عضومحور: یک کارت به‌ازای شاخص + ماتریس «کدام اعضا؟» — به‌جای کارت تکراری به‌ازای هر عضو */ if (g.loop && MEMBER_MATRIX_KEYS.has(g.key)) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$member$2d$matrix$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MemberAttributionCard"], {
                        g: g,
                        assessment: assessment,
                        cfg: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$member$2d$matrix$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MATRIX_CFG"][g.key]
                    }, g.key, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 811,
                        columnNumber: 18
                    }, this);
                }
                const rel = membersFor(g);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        g.key === "D3" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$editors$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IncomeEditor"], {
                            assessment: assessment
                        }, void 0, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 816,
                            columnNumber: 32
                        }, this),
                        g.key === "poverty" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PovertyEditor, {
                            assessment: assessment
                        }, void 0, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 817,
                            columnNumber: 37
                        }, this),
                        g.key === "D1m" && !provider && assessment.members.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm rounded-xl border border-amber-200 bg-amber-50 p-3.5 leading-6",
                            children: "تأمین‌کننده اصلی در مدیریت اعضا مشخص نشده است؛ برای ثبت وضعیت اشتغال (D1)، در گام اطلاعات پایه نقش «تأمین‌کننده اصلی» را به عضو مناسب بدهید."
                        }, void 0, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 819,
                            columnNumber: 15
                        }, this),
                        rel.length === 0 && g.loop && g.memberFilter === "schoolAge" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm rounded-xl border bg-muted/40 p-3.5 leading-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: [
                                        g.title,
                                        ":"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                                    lineNumber: 825,
                                    columnNumber: 17
                                }, this),
                                " عضو در سن آموزش اجباری ثبت نشده است — این شاخص به‌طور صحیح صفر محاسبه می‌شود."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 824,
                            columnNumber: 15
                        }, this),
                        rel.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border bg-card p-4 space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2 border-b pb-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold",
                                                children: g.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 832,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "outline",
                                                className: "font-mono",
                                                children: g.indicator
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 833,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$member$2d$matrix$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LegacyBadge"], {
                                                id: g.indicator
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 834,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$charter$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorCharterButton"], {
                                                id: g.indicator,
                                                assessment: assessment
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 835,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$section$2d$guide$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorGuideButton"], {
                                                id: g.indicator
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 836,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$member$2d$matrix$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WeightBadge"], {
                                                id: g.indicator
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 837,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-muted-foreground",
                                                children: [
                                                    "— ",
                                                    m.firstName,
                                                    " ",
                                                    m.lastName ?? ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 838,
                                                columnNumber: 19
                                            }, this),
                                            m.isMainProvider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                className: "bg-teal-strong",
                                                children: "تأمین‌کننده اصلی"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 839,
                                                columnNumber: 40
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 831,
                                        columnNumber: 17
                                    }, this),
                                    g.questions.filter((q)=>q.level === "member").map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$fields$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuestionField"], {
                                            q: q,
                                            idPrefix: m.id,
                                            value: assessment.answers[`${q.id}#${m.id}`] ?? null,
                                            onChange: (v)=>setAnswer(assessment.id, `${q.id}#${m.id}`, v),
                                            members: assessment.members,
                                            assessmentId: assessment.id,
                                            onKeyChange: (key, v)=>setAnswer(assessment.id, key, v),
                                            serviceLock: serviceLockFor(q, `${q.id}#${m.id}`)
                                        }, q.id, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 842,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, `${g.key}-${m.id}`, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 830,
                                columnNumber: 15
                            }, this)),
                        !g.loop && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border bg-card p-4 space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2 border-b pb-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold",
                                            children: g.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 860,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "outline",
                                            className: "font-mono",
                                            children: g.indicator
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 861,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$member$2d$matrix$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LegacyBadge"], {
                                            id: g.indicator
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 862,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$charter$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorCharterButton"], {
                                            id: g.indicator,
                                            assessment: assessment
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 863,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$section$2d$guide$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IndicatorGuideButton"], {
                                            id: g.indicator
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 864,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$member$2d$matrix$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WeightBadge"], {
                                            id: g.indicator
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 865,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-muted-foreground",
                                            children: "سطح خانوار"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 866,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                                    lineNumber: 859,
                                    columnNumber: 17
                                }, this),
                                g.indicator === "C1" && h.dwellingType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-muted-foreground bg-muted/40 border rounded-lg px-3 py-2 leading-5",
                                    children: [
                                        "نوع محل سکونت ثبت‌شده (اطلاعات پایه): ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            className: "text-foreground",
                                            children: h.dwellingType
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 871,
                                            columnNumber: 59
                                        }, this),
                                        " — این شاخص فقط پایداری و تهدید محل خواب را می‌سنجد و پرسش جداگانه‌ای درباره نوع سکونت ندارد."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                                    lineNumber: 870,
                                    columnNumber: 19
                                }, this),
                                g.indicator === "C3" && h.tenureType && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-muted-foreground bg-muted/40 border rounded-lg px-3 py-2 leading-5",
                                    children: [
                                        "نوع تصرف ثبت‌شده: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            className: "text-foreground",
                                            children: h.tenureType
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 876,
                                            columnNumber: 39
                                        }, this),
                                        ws.property?.status === "ok" && ws.property.prefills?.householdPatch?.tenureType ? " — از استعلام املاک (ملاک ثبتی)" : "",
                                        " — این شاخص پایداری و خطر حق سکونت را می‌سنجد."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                                    lineNumber: 875,
                                    columnNumber: 19
                                }, this),
                                g.questions.filter((q)=>q.level === "household").map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$fields$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuestionField"], {
                                        q: q,
                                        value: assessment.answers[q.id] ?? null,
                                        onChange: (v)=>setAnswer(assessment.id, q.id, v),
                                        members: assessment.members,
                                        assessmentId: assessment.id,
                                        onKeyChange: (key, v)=>setAnswer(assessment.id, key, v),
                                        serviceLock: serviceLockFor(q, q.id)
                                    }, q.id, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 881,
                                        columnNumber: 19
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 858,
                            columnNumber: 15
                        }, this)
                    ]
                }, g.key, true, {
                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                    lineNumber: 815,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 801,
        columnNumber: 5
    }, this);
}
function PovertyEditor({ assessment }) {
    const updateHousehold = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.updateHousehold);
    const pl = assessment.household.povertyLine ?? {
        status: "unverified"
    };
    const set = (patch)=>updateHousehold(assessment.id, {
            povertyLine: {
                ...pl,
                ...patch
            }
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border bg-card p-5 space-y-3.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 border-b pb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold",
                        children: "خط فقر منطقه‌ای"
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 909,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "outline",
                        className: "font-mono",
                        children: "D3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 910,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: "outline",
                        className: "text-amber-700 border-amber-300",
                        children: "نیازمند تصویب مرجع"
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 911,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 908,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground leading-5",
                children: "کفایت منابع (D3) با خط فقر معتبر منطقه‌ای سنجیده می‌شود. بدون مبلغ، منبع و وضعیت اعتبار، نتیجه D3 «غیرنهایی» می‌ماند. هزینه‌های منظورشده در خط فقر دوباره از D3 کسر نمی‌شود و ودیعه اجاره ماهانه محسوب نمی‌شود."
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 913,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid sm:grid-cols-2 gap-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "pl-amount",
                                children: "خط فقر سرانه ماهانه (تومان)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 919,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                id: "pl-amount",
                                type: "number",
                                min: 0,
                                dir: "ltr",
                                value: pl.monthlyPerCapita ?? "",
                                onChange: (e)=>set({
                                        monthlyPerCapita: e.target.value === "" ? undefined : Number(e.target.value)
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 920,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 918,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "pl-region",
                                children: "منطقه"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 923,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                id: "pl-region",
                                value: pl.region ?? "",
                                onChange: (e)=>set({
                                        region: e.target.value
                                    }),
                                placeholder: "مثلاً استان تهران — مناطق شهری"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 924,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 922,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "pl-source",
                                children: "منبع"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 927,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                id: "pl-source",
                                value: pl.source ?? "",
                                onChange: (e)=>set({
                                        source: e.target.value
                                    }),
                                placeholder: "مثلاً گزارش رسمی مرجع — نسخه ۱۴۰۴"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 928,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 926,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "pl-date",
                                children: "تاریخ اعتبار"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 931,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                id: "pl-date",
                                value: pl.validAsOf ?? "",
                                onChange: (e)=>set({
                                        validAsOf: e.target.value
                                    }),
                                placeholder: "مثلاً ۱۴۰۴/۰۶"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 932,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 930,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                htmlFor: "pl-status",
                                children: "وضعیت اعتبارسنجی"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 935,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                value: pl.status,
                                onValueChange: (v)=>set({
                                        status: v
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        id: "pl-status",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 937,
                                            columnNumber: 43
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 937,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "unverified",
                                                children: "تأییدنشده (نیازمند بررسی مرجع)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 939,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "verified",
                                                children: "تأییدشده توسط مرجع"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 940,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "invalid",
                                                children: "نامعتبر"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 941,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 938,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 936,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 934,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 917,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 907,
        columnNumber: 5
    }, this);
}
/* گام ۹ — کیفیت داده */ function QualityStep({ assessment }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["QualityPanel"], {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 954,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EvidenceGrid, {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 955,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DocumentsSummary, {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 956,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 953,
        columnNumber: 5
    }, this);
}
/* خلاصه مدارک مثبت ثبت‌شده روی پرسش‌ها — شاهد‌محوری سنجش */ function DocumentsSummary({ assessment }) {
    const documents = assessment.documents ?? [];
    const removeDocument = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.removeDocument);
    const memberName = (key)=>{
        const mid = key.split("#")[1];
        const m = assessment.members.find((x)=>x.id === mid);
        return m ? `${m.firstName} ${m.lastName ?? ""}` : undefined;
    };
    const qTitle = (key)=>{
        const qid = key.split("#")[0].split("__")[0];
        /* کلید مدرک می‌تواند کلید گروه شاخص (مثلاً A1) یا شناسه پرسش (مثلاً A1_disease) باشد */ const grp = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTION_GROUPS"].find((g)=>g.key === qid);
        if (grp) return grp.title;
        for (const g of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QUESTION_GROUPS"]){
            const q = g.questions.find((x)=>x.id === qid);
            if (q) return q.title;
        }
        return qid;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border bg-card p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-semibold mb-1.5 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$badge$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileBadge2$3e$__["FileBadge2"], {
                        className: "size-5 text-teal-strong",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 984,
                        columnNumber: 68
                    }, this),
                    " مدارک مثبت ثبت‌شده (",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(documents.length),
                    " مورد)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 984,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground mb-3.5 leading-5",
                children: "مدارکی که در طول پرسشنامه روی پرسش‌های شاخص‌ها ثبت شده‌اند — هر مدرک به پرسش مبدا (و در سطح عضو، به عضو مشخص) متصل است و در بازبینی انسانی استفاده می‌شود."
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 985,
                columnNumber: 7
            }, this),
            documents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground rounded-xl border bg-muted/30 p-3.5",
                children: "هنوز مدرکی ثبت نشده است — در پرسش‌های دارای شرط، پس از پاسخ مثبت، کنترل «ثبت مدرک مثبت» باز می‌شود."
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 989,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-2",
                children: documents.map((d)=>{
                    const who = memberName(d.forKey);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "rounded-xl border p-3 flex flex-wrap items-center gap-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$badge$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileBadge2$3e$__["FileBadge2"], {
                                className: "size-4 text-teal-strong shrink-0",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 996,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: d.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 997,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "text-[10px] whitespace-nowrap",
                                children: evidenceKindShort(d.kind)
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 998,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-muted-foreground truncate",
                                children: [
                                    "برای پرسش: «",
                                    qTitle(d.forKey),
                                    "»",
                                    who ? ` — عضو: ${who}` : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 999,
                                columnNumber: 17
                            }, this),
                            d.reference && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-muted-foreground",
                                children: [
                                    "مرجع: ",
                                    d.reference
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1000,
                                columnNumber: 33
                            }, this),
                            d.fileName && (d.dataUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: d.dataUrl,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "text-xs text-teal-strong underline underline-offset-2",
                                children: "فایل مدرک"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1002,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-muted-foreground",
                                children: d.fileName
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1002,
                                columnNumber: 166
                            }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-muted-foreground ms-auto whitespace-nowrap",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDateTime"])(d.recordedAt)
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1004,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>removeDocument(assessment.id, d.id),
                                className: "text-destructive/70 hover:text-destructive",
                                "aria-label": `حذف مدرک ${d.title}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "size-4",
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/porsesh/wizard.tsx",
                                    lineNumber: 1006,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1005,
                                columnNumber: 17
                            }, this)
                        ]
                    }, d.id, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 995,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 991,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 983,
        columnNumber: 5
    }, this);
}
function evidenceKindShort(k) {
    const map = {
        medical: "درمانی",
        education: "آموزشی",
        insurance: "بیمه‌ای",
        legal: "حقوقی",
        administrative: "اداری",
        photo: "تصویر",
        other: "سایر"
    };
    return map[k] ?? "سایر";
}
const EVIDENCE_OPTIONS = [
    {
        value: "declared",
        label: "اظهار خانوار"
    },
    {
        value: "field",
        label: "گزارش میدانی"
    },
    {
        value: "document",
        label: "مستند / استعلام"
    },
    {
        value: "needs_verification",
        label: "نیازمند راستی‌آزمایی"
    }
];
function EvidenceGrid({ assessment }) {
    const setAnswer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.setAnswer);
    const groups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsOfStep"])("health").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsOfStep"])("education"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsOfStep"])("housing"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsOfStep"])("livelihood"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["groupsOfStep"])("care")), []);
    const indicators = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        for (const g of groups)if (!map.has(g.indicator)) map.set(g.indicator, g.title);
        return [
            ...map.entries()
        ];
    }, [
        groups
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border bg-card p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-semibold mb-1.5",
                children: "منبع/کیفیت شواهد هر شاخص"
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 1043,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground mb-3.5 leading-5",
                children: "این فیلدهای مشترک پشت هر شاخص عمدتاً برای کاربر سازمانی نمایش داده می‌شوند، نه الزام خانوار. منبع داده، کفایت و نیاز راستی‌آزمایی را ثبت کنید."
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 1044,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5",
                children: indicators.map(([id, title])=>{
                    const v = assessment.answers[`evidence_${id}`];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border p-3 space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 text-sm font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                        variant: "outline",
                                        className: "font-mono",
                                        children: id
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 1053,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 1054,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1052,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                value: typeof v === "string" ? v : "declared",
                                onValueChange: (val)=>setAnswer(assessment.id, `evidence_${id}`, val),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "h-8 text-xs",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                                            lineNumber: 1057,
                                            columnNumber: 56
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 1057,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: EVIDENCE_OPTIONS.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: o.value,
                                                children: o.label
                                            }, o.value, false, {
                                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                                lineNumber: 1058,
                                                columnNumber: 61
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 1058,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1056,
                                columnNumber: 15
                            }, this)
                        ]
                    }, id, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1051,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 1047,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 1042,
        columnNumber: 5
    }, this);
}
/* گام ۱۰ — خلاصه و ارجاع */ function SummaryStep({ assessment }) {
    const setView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.setView);
    const addChangeStatement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.addChangeStatement);
    const updateRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.updateRequest);
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePorsesh"])((s)=>s.mode);
    const [changeText, setChangeText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [types, setTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(assessment.requestTypes ?? []);
    const toggleReq = (t)=>setTypes((prev)=>prev.includes(t) ? prev.filter((x)=>x !== t) : [
                ...prev,
                t
            ]);
    // شناسنامه ارزیابی — فیلدهای کنترلی گروه «هویت ارزیابی و منشأ داده» (پشت پرسشنامه)
    const ws = assessment.webServices ?? {};
    const fetchedServices = Object.values(ws).filter((r)=>r && r.status !== "error").length;
    const openIssues = assessment.qualityIssues.filter((i)=>i.status === "open").length;
    const prefillAnswers = Object.values(ws).filter((r)=>r?.prefills?.answerPrefills?.length).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ResultCard"], {
                assessment: assessment,
                compact: true
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 1086,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-card p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-1 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                className: "size-5 text-teal-strong",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1090,
                                columnNumber: 68
                            }, this),
                            " درخواست خانوار (خدماتی — خارج از امتیاز)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1090,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground mb-3 leading-5",
                        children: "نوع درخواست در ثبت‌نام انتخاب شده و به‌عنوان مقدار اولیه درج شده است؛ می‌توانید آن را تکمیل یا اصلاح کنید. درخواست خروجی خدماتی و مسیر ارجاع است و امتیاز مستقل ندارد. درخواست‌های قبلی پرونده با تاریخ و وضعیت حفظ می‌شوند."
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1091,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid sm:grid-cols-2 gap-2",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$questions$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["REQUEST_TYPES"].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2.5 rounded-lg border p-3 text-sm cursor-pointer min-h-11 transition-colors", types.includes(t) ? "border-teal-strong bg-teal-soft" : "bg-background hover:border-ring/50"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                        checked: types.includes(t),
                                        onCheckedChange: ()=>toggleReq(t),
                                        "aria-label": t
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 15
                                    }, this),
                                    t
                                ]
                            }, t, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1097,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1095,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        className: "mt-4",
                        variant: "outline",
                        onClick: ()=>{
                            updateRequest(assessment.id, types);
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                                title: "درخواست خانوار ذخیره شد",
                                description: "به‌عنوان داده خدماتی ثبت شد و در امتیاز اثری ندارد."
                            });
                        },
                        children: "ذخیره درخواست"
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 1089,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-card p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-1.5 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$badge$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileBadge2$3e$__["FileBadge2"], {
                                className: "size-5 text-teal-strong",
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1110,
                                columnNumber: 70
                            }, this),
                            " شناسنامه ارزیابی (فیلدهای کنترلی)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground mb-3 leading-5",
                        children: "این فیلدها سؤال از خانوار نیستند؛ سامانه و کاربر سازمانی ثبت می‌کنند تا هر نتیجه قابل ممیزی، تکرارپذیر و بازنگری‌پذیر باشد."
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-sm",
                        children: [
                            {
                                k: "کد ملی سرپرست (کلید پرونده)",
                                v: assessment.household.headNationalId || "—"
                            },
                            {
                                k: "شماره موبایل سرپرست",
                                v: assessment.household.headMobile || "—"
                            },
                            {
                                k: "ثبت‌نام در سامانه",
                                v: assessment.household.registeredAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDateTime"])(assessment.household.registeredAt) : "بدون ثبت‌نام (ورود مددکار)"
                            },
                            {
                                k: "شناسه ارزیابی",
                                v: assessment.id
                            },
                            {
                                k: "نسخه قواعد",
                                v: assessment.ruleSetVersion
                            },
                            {
                                k: "وضعیت پرونده",
                                v: assessment.status === "draft" ? "پیش‌نویس" : assessment.status === "submitted" ? "ثبت‌شده" : assessment.status
                            },
                            {
                                k: "تاریخ ایجاد",
                                v: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDateTime"])(assessment.createdAt)
                            },
                            {
                                k: "آخرین به‌روزرسانی",
                                v: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faDateTime"])(assessment.updatedAt)
                            },
                            {
                                k: "منشأ داده — استعلام‌های ثبتی",
                                v: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(fetchedServices)} سرویس دریافت شده`
                            },
                            {
                                k: "پیش‌تکمیل از استعلام (شاخص‌ها)",
                                v: prefillAnswers > 0 ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(prefillAnswers)} سرویس اعمال شده` : "—"
                            },
                            {
                                k: "موارد باز کیفیت داده",
                                v: openIssues > 0 ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(openIssues)} مورد` : "—"
                            },
                            {
                                k: "اصلاحات مستند",
                                v: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mpi$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["faNum"])(assessment.corrections.length)} مورد`
                            }
                        ].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border bg-muted/20 px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "text-[11px] text-muted-foreground",
                                        children: r.k
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 1130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "font-medium leading-5 truncate",
                                        dir: "auto",
                                        children: r.v
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                                        lineNumber: 1131,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, r.k, true, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1129,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 1109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-card p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-1.5",
                        children: "اعلام تغییر شرایط توسط خانوار"
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground mb-3 leading-5",
                        children: "هر زمان که وضعیت خانوار تغییر کرد، می‌توانید اینجا ثبت کنید؛ ثبت، داده پیش‌تکمیل‌شده را باطل نمی‌کند و در بازبینی انسانی بررسی می‌شود."
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                value: changeText,
                                onChange: (e)=>setChangeText(e.target.value),
                                placeholder: "مثلاً سرپرست خانوار بستری شد ...",
                                className: "max-w-xl"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: ()=>{
                                    if (!changeText.trim()) return;
                                    addChangeStatement(assessment.id, changeText);
                                    setChangeText("");
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"])({
                                        title: "تغییر شرایط ثبت شد"
                                    });
                                },
                                children: "ثبت"
                            }, void 0, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1140,
                        columnNumber: 9
                    }, this),
                    (assessment.changeStatements?.length ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-3 space-y-1.5 text-sm",
                        children: assessment.changeStatements.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "rounded-lg bg-muted/40 border px-3 py-2",
                                children: c.text
                            }, i, false, {
                                fileName: "[project]/src/components/porsesh/wizard.tsx",
                                lineNumber: 1152,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1150,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 1137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border bg-teal-soft/50 border-teal-strong/30 p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold mb-1.5",
                        children: "بازبینی انسانی و ارجاع"
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm leading-6 mb-3",
                        children: "ثبت نهایی پرسشنامه، درخواست را برای بازبینی مددکار خانواده آماده می‌کند. تصمیم‌های تخصصی، مسیر خدمت و ارجاع در نمای حرفه‌ای مدیریت می‌شود. پیشنهاد همیار جایگزین تصمیم تخصصی مددکار نیست و مالکیت حرفه‌ای پرونده تا پذیرش مسئولیت مقصد حفظ می‌شود."
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>setView("professional"),
                            children: "مشاهده داشبورد حرفه‌ای و ارجاع"
                        }, void 0, false, {
                            fileName: "[project]/src/components/porsesh/wizard.tsx",
                            lineNumber: 1165,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/porsesh/wizard.tsx",
                        lineNumber: 1164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 1158,
                columnNumber: 7
            }, this),
            mode === "pro" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$porsesh$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReferralPanel"], {
                assessment: assessment
            }, void 0, false, {
                fileName: "[project]/src/components/porsesh/wizard.tsx",
                lineNumber: 1169,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/porsesh/wizard.tsx",
        lineNumber: 1085,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_components_porsesh_wizard_tsx_3c18429b._.js.map